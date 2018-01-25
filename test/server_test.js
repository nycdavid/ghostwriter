const expect = require('chai').expect;
const App = require('../app.js');
const jsdom = require('jsdom');
const request = require('supertest');
const { JSDOM } = jsdom;

describe('Server responds with HTML', () => {
  let server;
  beforeEach(() => {
    server = App.listen();
  });

  it('works!', async () => {
    let res = await request(server).get('/');
    const dom = new JSDOM(res.text, {
      url: 'http://localhost',
      contentType: 'text/html'
    });
    console.log('body', dom.window.document.body.innerHTML);
  });
});
