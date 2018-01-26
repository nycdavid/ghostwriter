const expect = require('chai').expect;
const App = require('../app.js');
const jsdom = require('jsdom');
const request = require('supertest');
const { JSDOM } = jsdom;

describe('Server responds with HTML', () => {
  let server;
  let dom;
  beforeEach(async () => {
    server = App.listen();
    let res = await request(server).get('/');
    dom = new JSDOM(res.text, {
      resources: 'usable',
      runScripts: 'dangerously',
      beforeParse(window) {
        window.alert = (alertMsg) => {
          console.log('ALERT:', alertMsg);
        }
      }
    }).window;
  });

  it('works!', () => {
    let textarea = dom.document.querySelector('.counter');
    let clickEvt = dom.document.createEvent('HTMLEvents');
    clickEvt.initEvent('click');
    textarea.dispatchEvent(clickEvt);
  });
});
