var expect = require('chai').expect,
    Browser = require('zombie'),
    app = require('../lib/app');

describe.only("SPA", function() {
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

    it("should have a header section with the site title", function() {
        expect(browser.queryAll('#header')).to.have.length(1);
        expect(browser.text('#header .navbar-brand')).to.equal('Offline Inventory');
    });

    it("should have an area for the list of available inventory items");
    it("should have an area for the selected inventory item");
    it("should have a footer with copyright information");
});

//describe.only("Default View (Read All)", function() {
//    it("should return a list of items");
//    describe("Each item", function() {
//        it("should have a name");
//        it("should have an id number that is link");
//        it("should have a rating");
//    });
//});
