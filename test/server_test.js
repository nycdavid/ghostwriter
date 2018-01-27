const expect = require('chai').expect;
const App = require('../app.js');
const jsdom = require('jsdom');
const request = require('supertest');
const { JSDOM } = jsdom;
const { createScriptTag, mockAlert, mockConsole } = require('./test_helper.js')

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

  it('works!', () => {
    let textarea = dom.document.querySelector('.counter');
    let clickEvt = dom.document.createEvent('HTMLEvents');
    clickEvt.initEvent('click');
    textarea.dispatchEvent(clickEvt);
  });
});
