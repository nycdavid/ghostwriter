const ShareDB = require('sharedb/lib/client');
const ws = new WebSocket('ws://localhost:1338');
const connection = new ShareDB.Connection(ws);

console.log(connection);
