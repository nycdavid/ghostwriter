const fs = require('fs');

const DbConfig = require('../config/db.js');

const MongoClient = require('mongodb').MongoClient.connect(`mongodb://localhost:27017/${DbConfig['test']}`);

function createScriptTag(dom) {
  let scriptTag = dom.document.createElement('script');
  let bundleJsBuf = fs.readFileSync('./static/bundle.js');
  scriptTag.type = 'text/javascript';
  scriptTag.innerHTML = bundleJsBuf.toString();
  return scriptTag;
}

function mockAlert(msg) {
  console.log('Alert:', msg);
}

function mockConsole(msg) {
  console.log('Log:', msg);
}

module.exports = {
  createScriptTag,
  mockAlert,
  mockConsole,
  MongoClient
}
