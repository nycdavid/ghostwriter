const Koa = require('koa');
const views = require('koa-views');
const path = require('path');
const _ = require('koa-route');
const App = new Koa();
const ShareDB = require('sharedb');
const db = require('sharedb-mongo')('mongodb://localhost:27017/test');
const share = new ShareDB(db);
const connection = share.connect();

// Views
App.use(views(path.join(__dirname, '/views'), { extension: 'html' }));

// Routes
App.use(_.get('/', Home));

async function Home(ctx) {
  await ctx.render('index');
}

module.exports = {
  App: App,
  share: share
}
