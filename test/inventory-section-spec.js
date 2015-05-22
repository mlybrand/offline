var expect = require('chai').expect,
    config = require('./integration-test-config'),
    Browser = config.Browser,
    app = config.app,
    port = config.port,
    url = config.url;

describe("Inventory Section", function() {
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

    it("should have headers for ID, name and rating", function() {
        expect(browser.queryAll("#inventory table thead tr")).to.have.length(1);
        expect(browser.queryAll("#inventory table thead tr th")).to.have.length(3);
        expect(browser.text("#inventory .list-header.id-header")).to.equal("ID");
        expect(browser.text("#inventory .list-header.name-header")).to.equal("Name");
        expect(browser.text("#inventory .list-header.rating-header")).to.equal("Rating");
    });

    it("should have a list of items", function() {
        expect(browser.queryAll("#inventory table tbody tr")).to.have.length(6);
    });

    describe("Each Inventory Item", function() {
        it("should have an ID, a name and a rating");
        describe("Each Item ID", function() {
            it("should be a seven-digit number");
            it("should be a hyperlink");
            it("should link to a function to call the detail with itself");
        });
        describe("Each Rating", function() {
            it("should be a number between 1 and 10");
            it("should be expressed to no more than 3 decimal places");
        });
    });
});