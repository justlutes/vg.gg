import axios from 'axios';

const baseURL = 'https://api.twitch.tv/kraken/streams/?game=Vainglory&limit=9';

class TWITCHAPI {
  constructor() {
    this.axios = axios.create({
      baseURL,
      crossDomain: true,
      validateStatus: status => status >= 200 && status < 500,
    });
  }

  transformConfig(config = {}) {
    const newConfig = config;
    newConfig.headers = Object.assign(newConfig.headers || {}, {
      'Client-ID': process.env.TWITCH_KEY,
      Accept: 'application/json',
    });

    return newConfig;
  }

  get(path, config) {
    return this.axios.get(path, this.transformConfig(config));
  }

  formatStreams(data) {
    return data.streams.map(v => ({
      name: v.channel.display_name,
      thumbnail: v.preview.large,
      title: v.channel.status,
      viewers: v.viewers,
      url: v.channel.url,
    }));
  }

  async getStreams() {
    try {
      const streamObject = await this.get();
      const formattedStreams = this.formatStreams(streamObject.data);
      return formattedStreams;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default new TWITCHAPI();
