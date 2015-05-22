var expect = require('chai').expect,
    Browser = require('zombie'),
    app = require('../lib/app'),
    port = 3001,
    url = "http://localhost:" + port;

describe("SPA", function() {
    var server,
        browser = new Browser();

    before(function() {
        server = app.listen(port);
    });

    after(function() {
        server.close();
    });

    beforeEach(function() {
        return browser.visit(url);
    });

    it("should have a header section with the site title", function() {
        expect(browser.queryAll('#header')).to.have.length(1);
        expect(browser.text('#header .navbar-brand')).to.equal('Offline Inventory');
    });

    it("should have an area for the list of available inventory items", function() {
        expect(browser.queryAll('#inventory')).to.have.length(1);
        expect(browser.text('#inventory .panel-title')).to.equal('Inventory');
    });

    it("should have an area for the selected inventory item", function() {
        expect(browser.queryAll('#active-item')).to.have.length(1);
    });

    it("should have a footer with copyright information", function() {
        expect(browser.queryAll('footer')).to.have.length(1);
        expect(browser.text('footer p')).to.equal('© 2015 Mark Lybrand');
    });
});
