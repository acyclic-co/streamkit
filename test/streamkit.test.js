const expect = require('chai').expect;
const nock = require('nock');

const streamkit = require('../src/streamkit');
const { HOST } = require('../src/settings');

describe('StreamKit API', () => {
  
  before(() => {
    nock(HOST)
      .post('/login', { username: 'test', password: 'test' })
      .reply(200, { token: 'token' });

    nock(HOST)
      .post('/streams')
      .reply(200, {
        "message": "Stream created",
        "id": "uuid"
      });
  }),
  
  it ('returns token when successfully login', (done) => {
    streamkit
      .login({ username: 'test', password: 'test' })
      .then(success => {
        expect(success.data.token).to.be.a('string');
      })
      .then(done, done);
  });

  it ('returns stream UUID when new stream successfully added', (done) => {
    streamkit
      .newStream('stream', 'https://test')
      .then(success => {
        expect(success.data.id).to.be.a('string');
      })
      .then(done, done);
  });
});

