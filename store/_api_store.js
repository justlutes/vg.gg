import { action, computed, runInAction, observable, useStrict } from "mobx";
import VGAPI from "../VGAPI";

useStrict(true);

class APIStore {
  @observable shards = [];
  @observable player = [];
  @observable region = "na";
  @observable state = "pending"; // pending / done / error

  constructor() {
    this.player = [];
    this.shards = [];
    this.region = "na";
    this.state = "pending";
  }

  @action async fetchShards() {
    this.shards = [];
    this.state = "pending";
    try {
      const shards = await VGAPI.get("/shards/na/matches");
      runInAction(() => {
        this.state = "done";
        this.shards = shards;
      });
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
  }

  @action async getPlayers(players, region = "na") {
    this.player = [];
    this.state = "pending";
    const playerString = players.split(" ").join(",");

    try {
      const playersObject = await VGAPI.get(
        `/shards/${region}/players?filter[playerNames]=${playerString}`
      );
      runInAction(() => {
        this.state = "done";
        this.player = playersObject;
      });
    } catch (error) {
      runInAction(() => {
        this.state = "error";
        console.error(error);
      });
    }
  }

  // @computed get formatPlayers() {
  //   console.log("player", this.player);
  //   const { data } = this.player;
  //   const playerData = data.data || [];
  //   return playerData.map(d => ({
  //     name: d.attributes.name,
  //     level: d.attributes.level,
  //     karma: d.attributes.karma,
  //     elo: d.attributes.stats.elo_earned_season_7,
  //     wins: d.attributes.stats.wins,
  //     skillTier: d.attributes.stats.skillTier,
  //     winStreak: d.attributes.stats.winStreak,
  //     xp: d.attributes.stats.xp
  //   }));
  // }
}

export default new APIStore();
