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

textarea.onkeypress = function register(evt) {
  let position = evt.target.selectionStart;
  doc.submitOp([{ p: ['blogPost', position], si: evt.key }])
}

textarea.onkeydown = function(evt) {
  let position = evt.target.selectionStart;
  let tarea = evt.target;
  let originalString = tarea.textContent;
  if (evt.key === 'Backspace') {
    let length = originalString.length;
    console.log(originalString);
    let sd = tarea.textContent.substring(length, length - 1);
    console.log('sd:', sd);
    console.log('position:', position);
    doc.submitOp([{ p: ['blogPost', position - 1], sd: sd }])
  }
}

window.addEventListener('beforeunload', () => {
  ws.close();
});
