const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const _ = require('koa-route');
const App = new Koa();
const ShareDB = require('sharedb');
const db = require('sharedb-mongo')('mongodb://localhost:27017/test');
const WebsocketJSONStream = require('websocket-json-stream');
const share = new ShareDB(db);
const connection = share.connect();
const Websocket = require('ws');
const wss = new Websocket.Server({ port: 1338 });

wss.on('connection', function(ws) {
  wss.on('message', function(message) {
    console.log('message: ', message);
  });
  wss.send('Connected.');
});

const stream = new WebsocketJSONStream(wss);
share.listen(stream);

// Static Assets
App.use(require('koa-static')('./static'))

// Views
App.use(views(path.join(__dirname, '/views'), { extension: 'html' }));

// Routes
App.use(_.get('/', Home));

async function Home(ctx) {
  await ctx.render('index');
}

module.exports = App;
