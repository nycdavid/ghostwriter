const expect = require('chai').expect;
const App = require('../app.js');
const jsdom = require('jsdom');
const request = require('supertest');
const { JSDOM } = jsdom;
const { createScriptTag, mockAlert, mockConsole, MongoClient } = require('./test_helper.js')

const context = describe;

describe('Server responds with HTML', () => {
  let dom;
  beforeEach(async () => {
    let server = App.listen();
    let res = await request(server).get('/');
    dom = new JSDOM(res.text, {
      runScripts: 'dangerously',
      beforeParse(window) {
        window.alert = mockAlert;
        window.console.log = mockConsole;
      }
    }).window;
    let scriptTag = createScriptTag(dom);
    let body = dom.document.querySelector('.body');
    body.appendChild(scriptTag);
  });

  // it('works!', () => {
  //   let textarea = dom.document.querySelector('.counter');
  //   let clickEvt = dom.document.createEvent('HTMLEvents');
  //   clickEvt.initEvent('click');
  //   textarea.dispatchEvent(clickEvt);
  // });

  context('when the page first loads', () => {
    it('fetches data from the mongo', async () => {
      let db = await MongoClient;
      let notepads = db.collection('notepads');
      let blogPosts = await notepads.find({ _id: 'post1' }).toArray();
      let bodyId = blogPosts[0]._o
      let o_notepads = db.collection('o_notepads');
      console.log(bodyId);
    });
  });
});
