// Modules
const _ = require('koa-route');
const Koa = require('koa');
const Path = require('path');
const ShareDB = require('sharedb');
const Views = require('koa-views');
const Websocket = require('ws');
const WebsocketJSONStream = require('websocket-json-stream');
const Websockify = require('koa-websocket');

const App = Websockify(new Koa());
const db = require('sharedb-mongo')('mongodb://localhost:27017/test');
const backend = new ShareDB({ db });
const connection = backend.connect();
const wss = new Websocket.Server({ server: App });

let doc = connection.get('notepads', 'mainOne');
doc.fetch(err => {
  console.log('fetch');
  if (err) {
    throw err;
  }
  if (doc.type === null) {
    console.log('create');
    doc.create({ numClicks: 0 });
    return;
  }
});

// Static Assets
App.use(require('koa-static')('./static'))

// Views
App.use(Views(Path.join(__dirname, '/views'), { extension: 'html' }));

// Routes
App.use(_.get('/', Home));
App.ws.use(ctx => {
  console.log('WebSocket connected');
  const stream = new WebsocketJSONStream(ctx.websocket);
  backend.listen(stream);
  console.log(backend);
  ctx.websocket.on('message', msg => {
    console.log(msg);
  });
  ctx.websocket.send('foo');
});

async function Home(ctx) {
  await ctx.render('index');
}

App.listen(1337);
console.log('Listening on 1337...');
