import { action, runInAction, observable, useStrict } from "mobx";
import VGAPI from "../VGAPI";

useStrict(true);

class APIStore {
  @observable shards = [];
  @observable player = [];
  @observable region = "na";
  @observable state = "pending"; // pending / done / error

  @action
  setRegion(region = "na") {
    runInAction(() => (this.region = region));
  }

  @action
  async fetchShards() {
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

  @action
  async getPlayers(players, region = "na") {
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
}

export default new APIStore();
