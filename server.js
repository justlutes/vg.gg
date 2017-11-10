const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const next = require('next');
const VGAPI = require('vainglory');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

// fake DB
const matches = [];
let region = 'na';
const players = [];
let stats = [];
const vainglory = new VGAPI(process.env.API_KEY);

// socket.io server
io.on('connection', socket => {
  setInterval(() => pollMatchApi(socket), 1000*60*10);

  socket.on('matches', data => {
    matches.push(data);
    socket.broadcast.emit('matches', data);
  });

  socket.on('region', data => {
    region = data;
    vainglory.setRegion(region);
    socket.broadcast.emit('region', data);
  });

  socket.on('player', data => {
    players.push(data);
    socket.broadcast.emit('player', data);
  })

  socket.on('stats', data => {
    stats = data;
    socket.broadcast.emit('stats', data);
  })
});

nextApp.prepare().then(() => {
  app.get('/api/matches', (req, res) => res.json(matches));
  app.get('/api/stats', (req, res) => getPlayerStats(res));

  app.get('*', (req, res) => nextHandler(req, res));

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

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
  const options = {
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
  try {
    const matchData = await vainglory.matches.collection(options);
    if (matchData.errors) {
      throw Error(`Status: ${matchData.statusText}`);
    }
    socket.broadcast.emit('newMatches', matchData.match);

  } catch (error) {
    console.error(error);
  }
}

const getPlayerStats = async res => {
  const response = {
    status: 200,
    error: '',
    body: '',
  }

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
}

const formatPlayers = ({ player }) => {
  return player.map(p => ({
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
}
