const Koa = require('koa');
const _ = require('koa-route');
const App = new Koa();

App.use(_.get('/', Home));

async function Home(ctx) {
  ctx.body = 'Foo';
}

module.exports = App;
