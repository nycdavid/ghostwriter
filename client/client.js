const ShareDB = require('sharedb/lib/client');
const ws = new WebSocket('ws://localhost:1337');
const connection = new ShareDB.Connection(ws);

let textarea = document.querySelector('.counter');
let doc = connection.get('notepads', 'post1');
doc.subscribe(setNewData);

doc.on('op', setNewData);

function setNewData() {
  let position = textarea.selectionStart;
  textarea.textContent = doc.data.blogPost;
  textarea.selectionStart = position + 1;
}

textarea.onkeypress = function register(evt) {
  let position = evt.target.selectionStart;
  doc.submitOp([{ p: ['blogPost', position], si: evt.key }])
  evt.preventDefault();
}

textarea.addEventListener('pasteEvt', (evt) => {
  // let cont = document.querySelector('.counter').value;
  // console.log(cont);
});

textarea.onkeyup = evt => {
  let cont = document.querySelector('.counter').value;
  console.log(evt);
  console.log(cont);
}

textarea.onkeydown = function(evt) {
  let position = evt.target.selectionStart;
  if (evt.key === 'Backspace') {
    let content = this.textContent;
    let deletedChar = content.substring(position, position - 1);
    doc.submitOp([{ p: ['blogPost', position - 1], sd: deletedChar }]);
    return evt.preventDefault();
  }

  if (evt.metaKey === true && evt.key === 'v') {
    let keyupEvt = new Event('pasteEvt', { bubbles: true });
    this.dispatchEvent(keyupEvt);
  }
}

window.addEventListener('beforeunload', () => {
  ws.close();
});
