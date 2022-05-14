/* eslint-disable no-plusplus */
/* eslint-disable max-len */
const express = require('express');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const { getUsers, updateUserMonster } = require('../client/src/firebase-config');
// const Routers = require('./router');
// const db = require('../database');

const app = express();
const PORT = process.env.PORT || 3000;
const users = [];

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

let colorsArray = ['#5e0300', '#55005e', '#5e5a00', '#355e00', '#00355e', '#005e47', '#02005e', '#5e3500', '#fc8686', '#fcbd86', '#fcf886', '#bdfc86', '#f70707', '#86fcf8', '#9e86fc', '#86b1fc', '#c180d1', '#86fca7', '#fc869c', '#5b8bb0', '#00fffb', '#f58700', '#8502d6', '#ff08e6', '#09eb58', '#0400ff', '#d40000'];
io.on('connection', (socket) => {
  socket.on('join_room', (data) => {
    socket.join(data.room);

    if (!data.user) {
      socket.to(data.room).emit('got_users', users);
    } else if (data.user.user && users.filter((user) => user.id === data.user.user.uid).length === 0) {
      const user = {
        name: data.user.user.displayName,
        id: data.user.user.uid,
        room: Number(data.room),
        color: colorsArray.pop(),
      };
      users.push(user);
      socket.to(data.room).emit('got_users', users);
    } else {
      socket.to(data.room).emit('got_users', users);
    }
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('recieve_message', data);
  });

  socket.on('logout', (data) => {
    for (let i = 0; i < users.length; i++) {
      if (users[i].name === data) {
        users.splice(i, 1);
      }
    }
  });

  socket.on('send_log_message', (data) => {
    socket.to(data.board).emit('recieve_log_message', data);
  });

  socket.on('send_new_board', (newBoardSend) => {
    socket.to(newBoardSend.room).emit('recieve_new_board', newBoardSend);
  });

  socket.on('send_new_turn', (newTurn) => {
    socket.to(newTurn.room).emit('recieve_new_turn', newTurn);
  });

  socket.on('disconnect', () => {
  });

  socket.on('logout', (data) => {
    getUsers(data)
      .then((snapshot) => {
        const books = [];
        snapshot.docs.forEach((doc) => {
          books.push({ ...doc.data(), id: doc.id });
        });
        return (books);
      })
      .then((monsterArr) => (
        Promise.all(monsterArr.map((monster) => (
          updateUserMonster(data, monster.id, { onBoard: false, locationX: -1, locationY: -1 })
        )))
      ))
      .catch((err) => console.log(err));
  });
});

app.use(express.json());
app.use(expressStaticGzip(`${__dirname}/../client/dist`));
app.use(cors());

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
app.get('*.js', (req, res, next) => {
  if (req.header('Accept-Encoding').includes('br')) {
    req.url += '.br';
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'application/javascript; charset=UTF-8');
  }
  next();
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// } else if (data.user.user && data.changeRoom) {
//   const curUser = users.filter((user) => user.id === data.user.user.uid);
//   curUser[0].room = data.room;
// }
