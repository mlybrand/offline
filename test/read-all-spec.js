describe.only("Default View (Read All)", function() {
    it("should return a list of items");
    describe("Each item", function() {
        it("should have a name");
        it("should have a location");
        describe("Each location", function() {
            it("should have a latitude and longitude");
        });
        it("should have an id number");
        it("should have a rating");
    });
});
