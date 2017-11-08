import { action, computed, runInAction, observable, useStrict } from 'mobx';
import Router from 'next/router';
import VGAPI from './VGAPI';

import { API_KEY } from './config';

const vainglory = new VGAPI(API_KEY);
let store = null;

class Store {
  @observable shards = [];
  @observable player = {};
  @observable region = 'na';
  @observable state = 'pending'; // pending / done / error

  constructor(isServer, region, player) {
    this.player = player;
    this.shards = [];
    this.region = region;
  }

  @action setRegion(region) {
    vainglory.setRegion(region);
    this.region = region;
  }

  @action async fetchShards() {
    this.shards = [];
    this.state = 'pending';
    try {
      const shards = await VGAPI.get('/shards/na/matches');
      runInAction(() => {
        this.state = 'done';
        this.shards = shards;
      });
    } catch (error) {
      runInAction(() => {
        this.state = 'error';
      });
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

export function initStore(isServer, region = 'na', player = {}) {
  if (isServer) {
    return new Store(isServer, region, player);
  }
  if (store === null) {
    store = new Store(isServer, region, player);
  }
  return store;
}
