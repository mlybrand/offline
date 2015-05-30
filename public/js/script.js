$(function () {
    var vm = function() {
        var inventory = ko.observableArray([]);
        var activeItem = {
            id: ko.observable(),
            name: ko.observable(),
            rating: ko.observable(),
            dirty: ko.observable(false)
        };
        var activeItemTitle = ko.computed(function() {
            return this.id() || 'No Item Selected';
        }, activeItem);
        var enableForm = ko.computed(function() {
            return (this.id() ? true : false);
        }, activeItem);
        var resetForm = function(e) {
            activeItem.id("");
            activeItem.name("");
            activeItem.rating("");
            activeItem.dirty(false);
        };
        var addNewItem = function() {
            activeItem.id("New Item");
            activeItem.name("");
            activeItem.rating("");
            activeItem.dirty(false);
        };
        var selectItem = function() {
            activeItem.id(this.id());
            activeItem.name(this.name());
            activeItem.rating(this.rating());
            activeItem.dirty(false);
        };
        var makeDirty = function() {
            activeItem.dirty(true);
        };
        function generateNextId() {
            var maxId = (_.max(inventory(), function(item) {
                return item.id();
            })).id(),
                nextId = "0000000" +  (parseInt(maxId, 10) + 1);
            return nextId.substr(nextId.length - 7);
        }
        function addEntry(item) {
            item.id(generateNextId());
            inventory.push({
                id: ko.observable(item.id()),
                name: ko.observable(item.name()),
                rating: ko.observable(item.rating()),
                dirty: ko.observable(false)
            });
            resetForm();
        }
        var updateEntry = function() {
            if (activeItem.id() === "New Item") {
                addEntry(activeItem);
                return;
            }
            var id = activeItem.id(),
                match = _.find(inventory(), function(o) {
                    return o.id() === id;
                });
            match.name(activeItem.name());
            match.rating(activeItem.rating());
            resetForm();
        };
        var deleteItem = function() {
            var self = this;
            if (confirm("Do you really want to delete item " + self.id())) {
                var idx = _.findIndex(inventory(), function(item) {
                    return item.id() === self.id();
                });
                inventory.splice(idx, 1);
            }
        };
        return {
            inventory: inventory,
            activeItem: activeItem,
            activeItemTitle: activeItemTitle,
            enableForm: enableForm,
            resetForm: resetForm,
            addNewItem: addNewItem,
            selectItem: selectItem,
            makeDirty: makeDirty,
            updateEntry: updateEntry,
            deleteItem: deleteItem
        };
    }();

    $.ajax({
        url: '/api/items'
    })
    .done(function() {
        console.log('done');
    })
    .fail(function() {
        console.log('fail');
    })
    .always(function() {
        console.log('finally');
    });
    var data = {
        inventory: [
            {
                id: '0000001',
                name: 'desk',
                rating: 9
            },
            {
                id: '0000002',
                name: 'monitor',
                rating: 8
            },
            {
                id: '0000003',
                name: 'printer',
                rating: 4
            },
            {
                id: '0000004',
                name: 'telephone',
                rating: 4
            },
            {
                id: '0000005',
                name: 'mouse',
                rating: 10
            },
            {
                id: '0000006',
                name: 'keyboard',
                rating: 1
            }
        ]
    };

    ko.mapping.fromJS(data, {}, vm);
    ko.applyBindings(vm);
});