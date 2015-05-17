var expect = require('chai').expect,
    Browser = require('zombie'),
    app = require('../lib/app');

describe("Server", function() {
    var server,
        browser = new Browser();

    before(function() {
        server = app.listen(3001);
    });

    after(function() {
        server.close();
    });

    beforeEach(function() {
        return browser.visit("http://localhost:3001");
    });

    it('should respond when called', function() {
        expect(browser.text("#page-heading")).to.equal("Hello World");
    });
});