const ShareDB = require('sharedb/lib/client');
const ws = new WebSocket('ws://localhost:1338');
const connection = new ShareDB.Connection(ws);

ws.onmessage = function(evt) {
  console.log(evt);
};

let textarea = document.querySelector('.counter');

let doc = connection.get('notepads', 'mainOne');
doc.subscribe(data => {
  console.log(data);
});
console.log(doc.data);
doc.subscribe((err) => {
  console.log(err);
  console.log(doc.data);
});

textarea.onclick = function register(evt) {
  console.log('click');
  doc.submitOp()
}

window.addEventListener('beforeunload', () => {
  ws.close();
});
