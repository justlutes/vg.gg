const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const VGAPI = require('vainglory');

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  require('dotenv').load();
}
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

let region = 'na';
let players = [];
let stats = [];
const vainglory = new VGAPI(process.env.API_KEY);

const getPlayerMatches = async socket => {
  const now = new Date();
  const minus5days = new Date();
  let prev = '';
  try {
    minus5days.setDate(now.getDate() - 10);
    prev = minus5days.toISOString();
  } catch (error) {
    console.error(error);
  }

  const options = {
    page: {
      offset: 0,
      limit: 30,
    },
    sort: 'createdAt', // -createdAt for reverse
    filter: {
      'createdAt-start': prev, // ISO Date
      'createdAt-end': now.toISOString(), // ISO Date
      playerNames: players,
    },
  };
  try {
    const matchData = await vainglory.matches.collection(options);
    if (matchData.errors) {
      throw Error(`Status: ${matchData.statusText}`);
    }
    socket.emit('player_matches', matchData.match);
  } catch (error) {
    console.error(error);
  }
};

const pollMatchApi = async socket => {
  const now = new Date();
  const minus5days = new Date();
  let prev = '';
  try {
    minus5days.setDate(now.getDate() - 5);
    prev = minus5days.toISOString();
  } catch (error) {
    console.error(error);
  }

  /* defaults */
  const tournamentOptions = {
    page: {
      offset: 0,
      limit: 10,
    },
    sort: 'createdAt', // -createdAt for reverse
    filter: {
      'createdAt-start': prev, // ISO Date
      'createdAt-end': now.toISOString(), // ISO Date
      playerNames: [],
      teamNames: [],
    },
  };
  const options = {
    page: {
      offset: 0,
      limit: 10,
    },
    sort: 'createdAt', // -createdAt for reverse
    filter: {
      gameMode: 'ranked',
      'createdAt-start': prev, // ISO Date
      'createdAt-end': now.toISOString(), // ISO Date
      playerNames: [],
      teamNames: [],
    },
  };
  try {
    const matchData = await vainglory.matches.collection(options);
    const proMatchData = await vainglory.tournament
      .region('na')
      .matches.collection(tournamentOptions);
    if (matchData.errors) {
      throw Error(`Status: ${matchData.statusText}`);
    }
    const mergedResponse = {
      matches: matchData.match,
      proMatches: proMatchData.match,
    };
    socket.emit('matches', mergedResponse);
  } catch (error) {
    console.error(error);
  }
};

const formatPlayers = ({ player }) =>
  player.map(p => ({
    id: p.id,
    name: p.name,
    level: p.stats.level,
    karma: p.stats.karmaLevel,
    gold: p.stats.lifetimeGold.toFixed(2),
    rankedGames: p.stats.played_ranked,
    played: p.stats.played,
    elo: Object.keys(p.stats)
      .filter(stat => stat.includes('elo_earned'))
      .map(s => ({
        season: s.substring(s.indexOf('season'), s.length).replace('_', ' '),
        amount: p.stats[s],
      })),
    wins: p.stats.wins,
    skillTier: p.stats.skillTier,
    winStreak: p.stats.winStreak,
    xp: p.stats.xp,
  }));

const getPlayerStats = async res => {
  const response = {
    status: 200,
    error: '',
    body: '',
  };

  try {
    const playerData = await vainglory.players.getByName(players);
    if (playerData.errors) {
      throw playerData.statusText;
    }

    const playerStats = formatPlayers(playerData);
    response.body = playerStats;
    res.json(response);
  } catch (error) {
    response.status = 500;
    response.error = error;
    res.json(response);
  }
};

let interval;

// socket.io server
io.on('connection', socket => {
  if (interval) {
    clearInterval(interval);
  }

  interval = setInterval(() => pollMatchApi(socket), 50000);

  socket.on('initial', () => pollMatchApi(socket));

  socket.on('region', data => {
    region = data;
    vainglory.setRegion(region);
    socket.emit('region', data);
  });

  socket.on('player', data => {
    players = [data];
    socket.emit('player', data);
  });

  socket.on('player_matches', () => getPlayerMatches(socket));

  socket.on('stats', data => {
    stats = data;
    socket.emit('stats', data);
  });
});

nextApp.prepare().then(() => {
  app.get('/api/stats', (req, res) => getPlayerStats(res));

  app.get('*', (req, res) => nextHandler(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
