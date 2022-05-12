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

io.on('connection', (socket) => {
  socket.on('join_room', (data) => {
    socket.join(data.room);

    if (!data.user) {
      console.log('first if statement');
      socket.to(data.room).emit('got_users', users);
    } else if (data.user.user && users.filter((user) => user.id === data.user.user.uid).length === 0) {
      const user = {
        name: data.user.user.displayName,
        id: data.user.user.uid,
        room: Number(data.room),
      };
      users.push(user);
      console.log('the second if statement', users);
      socket.to(data.room).emit('got_users', users);
    } else {
      console.log('here', users);
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

  socket.on('disconnect', () => {
    // console.log("User Disconnected", socket.id);
    // console.log(socket);
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
// // app.use('/', Routers);

// app.get('/users', (req, res) => {
//   console.log('users in app.get', users);
//   res.send(users);
// });

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
