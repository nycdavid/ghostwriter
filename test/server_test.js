const expect = require('chai').expect;
const App = require('../app.js');
const jsdom = require('jsdom');
const request = require('supertest');
const { JSDOM } = jsdom;
const { createScriptTag, mockAlert, mockConsole, MongoClient } = require('./test_helper.js')
const { Server, WebSocket } = require('mock-socket');

const context = describe;

describe('Server responds with HTML', () => {
  let dom;
  beforeEach(async () => {
    const WebMocketServer = new Server('ws://localhost:1337');
    WebMocketServer.on('connection', (e) => {
      console.log(e);
    });
    dom = new JSDOM(`<body class="body"><textarea class="counter"></textarea></body>`, {
      runScripts: 'dangerously',
      beforeParse(window) {
        window.alert = mockAlert;
        window.console.log = mockConsole;
        window.WebSocket = WebSocket;
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
      let textarea = dom.document.querySelector('.counter');

      expect(textarea.textContent).to.equal('Test');
    });
  });
});
