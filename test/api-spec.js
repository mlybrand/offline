var expect = require('chai').expect,
    config = require('./integration-test-config'),
    app = config.app,
    port = config.port,
    url = config.url,
    supertest = require('supertest'),
    api = supertest(url + "/api");

describe.only('API', function() {
    var server;

    before(function() {
        server = app.listen(port);
    });

    after(function() {
        server.close();
    });

    describe('List', function() {
        it('should return json', function(done) {
            api.get('/items').expect('Content-Type', /json/).expect(200, done);
        });
    });
});

