import axios from "axios";

import { API_KEY } from "./config";

const baseURL = "https://api.dc01.gamelockerapp.com";

class VGAPI {
  constructor() {
    this.axios = axios.create({
      baseURL,
      crossDomain: true,
      validateStatus: status => status >= 200 && status < 500
    });
  }

  transformConfig(config = {}) {
    config.headers = Object.assign(config.headers || {}, {
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/vnd.api+json"
    });

    return config;
  }

  setAPIKey(apiKey) {
    this.apiKey = apiKey;
  }

  clearAPIKey() {
    this.apiKey = null;
  }

  get(path, config) {
    return this.axios.get(path, this.transformConfig(config));
  }

  // post(path, data, config) {
  //   return this.axios.post(path, data, this.transformConfig(config));
  // }
}

export default new VGAPI();
