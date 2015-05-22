describe("Inventory Section", function() {
    it("should have a list of items");
    describe("Each Inventory Item", function() {
        it("should have an ID");
        describe("Each Item ID", function() {
            it("should be a seven-digit number");
            it("should be a hyperlink");
            it("should link to a function to call the detail with itself");
        });
        it("should have a name");
        it("should have a rating");
        describe("Each Rating", function() {
            it("should be a number between 1 and 10");
            it("should be expressed to no more than 3 decimal places");
        });
    });
});