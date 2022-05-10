const express = require('express');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
// const Routers = require('./router');
// const db = require('../database');

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User Connected', socket.id);

  socket.on('join_room', (data) => {
    socket.join(data);
    // console.log(data, 'has joined the room')
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('recieve_message', data);
  });

  socket.on('send_log_message', (data) => {
    socket.to(data.board).emit('recieve_log_message', data);
  });

  socket.on('send_log_message_data', (data) => {
    socket.to(data.board).emit('recieve_log_message_data', data);
  });

  socket.on('send_new_board', (newBoardSend) => {
    socket.to(newBoardSend.room).emit('recieve_new_board', newBoardSend);
  });

  socket.on('disconnect', () => {
    // console.log("User Disconnected", socket.id)
  });
});

app.use(express.json());
app.use(expressStaticGzip(`${__dirname}/../client/dist`));
app.use(cors());
// // app.use('/', Routers);

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
