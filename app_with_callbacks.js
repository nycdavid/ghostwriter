const http = require('http');
const express = require('express');
const ShareDB = require('sharedb');
const WebSocket = require('ws');
const WebSocketJSONStream = require('websocket-json-stream');

const backend = new ShareDB();
const connection = backend.connect();
const doc = connection.get('examples', 'counter');
doc.fetch(err => {
  if (err) throw err;
  if (doc.type === null) {
    doc.create({ numClicks: 0 });
    return;
  }
});

const App = express();
App.use(express.static('static'));
App.use(express.static('views'));
const server = http.createServer(App);

const wss = new WebSocket.Server({ server: server });
wss.on('connection', (ws, req) => {
  const stream = new WebSocketJSONStream(ws);
  backend.listen(stream);
});

server.listen(8080);
