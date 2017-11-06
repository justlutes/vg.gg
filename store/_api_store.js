import { action, runInAction, observable, useStrict } from "mobx";
import VGAPI from "../VGAPI";

useStrict(true);

class APIStore {
  @observable shards = [];
  @observable player = [];
  @observable state = "pending"; // pending / done / error

  @action async fetchShards() {
    this.shards = [];
    this.state = "pending";
    try {
      const shards = await VGAPI.get("/shards/na/matches");
      //   const filteredShards = somePreprocessing(shards)
      // after await, modifying state again, needs an actions:
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
    console.log(players, region);
    try {
      // https://api.dc01.gamelockerapp.com/shards/na/players?filter[playerNames]=player1,player2"
      const playersObject = await VGAPI.get(
        `/shards/${region}/players?filter[playerNames]=${players}`
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
