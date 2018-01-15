const ShareDB = require('sharedb/lib/client');
const ws = new WebSocket('ws://localhost:8080');
const connection = new ShareDB.Connection(ws);

global.dbg = {};
global.dbg.ws = ws;
global.dbg.connection = connection;

let doc = connection.get('examples', 'counter');
doc.subscribe(function() {
  console.log('subscribe', doc.data);
});
global.dbg.doc = doc;

ws.onopen = function() {
  console.log('connection opened');
  console.log('doc:', doc);
  doc.subscribe(err => {
    // console.log('Error:', err);
    // console.log('Doc Data:', doc.data)
  });
}
doc.on('op', () => {
  console.log('opopopo');
});

// let textarea = document.querySelector('.counter');
//
// let doc = connection.get('notepads', 'mainOne');
// console.log('before', doc.pendingFetch);
// console.log('after', doc.pendingFetch);
// console.log('canSend:', doc.connection.canSend);

// textarea.onclick = function register(evt) {
//   console.log('click');
//   doc.submitOp()
// }

window.addEventListener('beforeunload', () => {
  ws.close();
});
