import { action, computed, runInAction, observable, useStrict } from 'mobx';
import Router from 'next/router';
import VGAPI from './VGAPI';

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

  @action
  setRegion(region) {
    this.region = region;
  }

  @action
  async fetchShards() {
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

  @action
  async getPlayers(players, region = 'na') {
    this.state = 'pending';
    this.player = {};
    let playerData = '';

    try {
      playerData = await VGAPI.get(`/shards/${region}/players?filter[playerNames]=${players}`);
      if (playerData.status !== 200) {
        throw 'No user found';
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

  @computed
  get formatPlayers() {
    const { data } = this.player;
    const playerData = data.data || [];

    return playerData.map(d => ({
      name: d.attributes.name,
      level: d.attributes.level,
      karma: d.attributes.karma,
      elo: d.attributes.stats.elo_earned_season_7,
      wins: d.attributes.stats.wins,
      skillTier: d.attributes.stats.skillTier,
      winStreak: d.attributes.stats.winStreak,
      xp: d.attributes.stats.xp,
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
