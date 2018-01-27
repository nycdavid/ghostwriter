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
const DbConfig = require('./config/db.js');
const db = require('sharedb-mongo')(`mongodb://localhost:27017/${DbConfig[process.env.NODE_ENV]}`);
const backend = new ShareDB({ db });
const connection = backend.connect();
const wss = new Websocket.Server({ server: App });

let doc = connection.get('notepads', 'post1');
doc.fetch(err => {
  if (err) {
    throw err;
  }
  if (doc.type === null) {
    console.log('create');
    doc.create({ blogPost: 'Test' });
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
  const stream = new WebsocketJSONStream(ctx.websocket);
  backend.listen(stream);
});

async function Home(ctx) {
  await ctx.render('index');
}

module.exports = App;
