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
        it('should return json with an inventory member', function(done) {
            api.get('/items')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function(res){
                    if (!('inventory' in res.body)) {
                        console.log('foo');
                        throw new Error('missing inventory');
                    }
                })
                .end(done);
        });
    });
});

