const ShareDB = require('sharedb/lib/client');
const ws = new WebSocket('ws://localhost:1337');
const connection = new ShareDB.Connection(ws);

let textarea = document.querySelector('.counter');
let doc = connection.get('notepads', 'post1');
doc.subscribe(setNewData);

doc.on('op', setNewData);

function setNewData() {
  console.log(doc.data);
  let position = textarea.selectionStart;
  textarea.textContent = doc.data.blogPost;
  textarea.selectionStart = position + 1;
}

textarea.onkeyup = function register(evt) {
  let position = evt.target.selectionStart;
  doc.submitOp([{ p: ['blogPost', position], si: evt.key }])
}

window.addEventListener('beforeunload', () => {
  ws.close();
});
