import { action, runInAction, observable, useStrict } from "mobx";
import VGAPI from "../VGAPI";

useStrict(true);

class APIStore {
  @observable shards = [];
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
}

export default new APIStore();
