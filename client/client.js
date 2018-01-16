const ShareDB = require('sharedb/lib/client');
const ws = new WebSocket('ws://localhost:1337');
const connection = new ShareDB.Connection(ws);

let textarea = document.querySelector('.counter');
let doc = connection.get('notepads', 'mainOne');
doc.subscribe(setNewData);

doc.on('op', setNewData);

function setNewData() {
  textarea.textContent = doc.data.numClicks;
}

textarea.onclick = function register(evt) {
  doc.submitOp([{ p: ['numClicks'], na: 1 }]);
}

window.addEventListener('beforeunload', () => {
  ws.close();
});
