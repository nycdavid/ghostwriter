const ShareDB = require('sharedb/lib/client');
const ws = new WebSocket('ws://localhost:1337');
const connection = new ShareDB.Connection(ws);

global.dbg = {};
global.dbg.ws = ws;
global.dbg.connection = connection;

ws.onmessage = function(evt) {
  console.log(evt.data);
};

let textarea = document.querySelector('.counter');

let doc = connection.get('notepads', 'mainOne');
console.log('before', doc.pendingFetch);
doc.fetch(err => {
  console.log('Error:', err);
  console.log('Doc Data:', doc.data)
});
console.log('after', doc.pendingFetch);
console.log('canSend:', doc.connection.canSend);

// doc.subscribe(data => {
//   console.log(data);
// });
// console.log(doc.data);
// doc.subscribe((err) => {
//   console.log(err);
//   console.log(doc.data);
// });

textarea.onclick = function register(evt) {
  console.log('click');
  doc.submitOp()
}

window.addEventListener('beforeunload', () => {
  ws.close();
});
