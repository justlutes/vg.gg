import { action, computed, runInAction, observable, useStrict } from 'mobx';
import Router from 'next/router';
import VGAPI from './VGAPI';

import { API_KEY } from './config';

const vainglory = new VGAPI(API_KEY);
let store = null;

class Store {
  @observable matches = {};
  @observable proMatches = {};
  @observable player = {};
  @observable region = 'na';
  @observable state = 'pending'; // pending / done / error

  constructor(isServer, region, player, matches, proMatches) {
    this.player = player;
    this.matches = matches;
    this.proMatches = proMatches;
    this.region = region;
  }

  @action setRegion(region) {
    vainglory.setRegion(region);
    this.region = region;
  }

  @action async fetchProMatches() {
    try {
      const matchData = await vainglory.tournament
        .region('na')
        .matches.collection();
      console.log('t', matchData);
    } catch (error) {
      console.log(error);
    }
  }

  @action async fetchRecentMatch() {
    const options = {
      page: {
        limit: 1,
      },
      filter: {
        gameMode: 'ranked',
      },
    };
    try {
      let matchData = await vainglory.matches.collection(options);
      return matchData.match;
    } catch (error) {
      console.log(error);
    }
  }

  @action async getPlayers(players, region = 'na') {
    this.state = 'pending';
    this.player = {};
    let playerData = '';
    let playerNames = [];

    if (players.indexOf(',') > -1) {
      playerNames = players.split(',').map(p => p.replace(',', '').trim());
    } else if (players.indexOf(' ') > -1) {
      playerNames = players.split(' ');
    } else {
      playerNames.push(players);
    }

    try {
      playerData = await vainglory.players.getByName(playerNames);

      if (playerData.errors) {
        throw playerData.statusText;
      }
      runInAction(() => {
        this.state = 'done';
        this.player = playerData;
      });
    } catch (error) {
      runInAction(() => {
        this.state = 'error';
        console.error(error);
        Router.push({ pathname: '/' });
      });
    }
  }

  @computed get formatPlayers() {
    const { player = [] } = this.player;

    return player.map(p => ({
      name: p.name,
      level: p.stats.level,
      karma: p.stats.karma,
      elo: p.stats.elo_earned_season_7,
      wins: p.stats.wins,
      skillTier: p.stats.skillTier,
      winStreak: p.stats.winStreak,
      xp: p.stats.xp,
    }));
  }
}

export function initStore(
  isServer,
  region = 'na',
  player = {},
  matches = {},
  proMatches = {},
) {
  if (isServer) {
    return new Store(isServer, region, player, matches, proMatches);
  }
  if (store === null) {
    store = new Store(isServer, region, player, matches, proMatches);
  }
  return store;
}
