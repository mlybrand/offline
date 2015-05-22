var Browser = require('zombie'),
    app = require('../lib/app'),
    port = 3001,
    url = "http://localhost:" + port;

module.exports = {
    Browser: Browser,
    app: app,
    port: port,
    url: url
};