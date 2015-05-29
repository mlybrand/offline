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
        it('should return ok status when called', function(done) {
            api.get('/items').expect(200, done);
        });
    });
});

