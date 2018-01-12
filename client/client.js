const ShareDB = require('sharedb/lib/client');
const ws = new WebSocket('ws://localhost:1338');
const connection = new ShareDB.Connection(ws);

ws.onmessage = function(evt) {
  console.log(evt);
};

let notepad = connection.get('notepads', 'mainOne');
let textArea = document.getElementsByTagName('textarea');

textArea[0].onkeyup = function register(evt) {
  console.log(evt);
}

window.addEventListener('beforeunload', () => {
  ws.close();
});
