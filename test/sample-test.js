var expect = require('chai').expect,
    Browser = require('zombie'),
    app = require('../lib/app');

describe("Server", function() {
    var server;

    before(function() {
        server = app.listen(3001);
    });

    after(function() {
        server.close();
    });

    it('should respond when called', function(done) {
        var browser = new Browser();
        browser.visit("http://localhost:3001", function() {
            expect(browser.text("#page-heading")).to.equal("Hello World");
            done();
        });
    });
});