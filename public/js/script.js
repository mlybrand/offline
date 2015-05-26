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
        var selectItem = function() {
            activeItem.id(this.id());
            activeItem.name(this.name());
            activeItem.rating(this.rating());
            activeItem.dirty(false);
        };
        var makeDirty = function() {
            activeItem.dirty(true);
        };
        var updateEntry = function() {
            var id = activeItem.id(),
                match = _.find(inventory(), function(o) {
                    return o.id() === id;
                });
            match.name(activeItem.name());
            match.rating(activeItem.rating());
            activeItem.dirty(false);
        };
        return {
            inventory: inventory,
            activeItem: activeItem,
            activeItemTitle: activeItemTitle,
            selectItem: selectItem,
            makeDirty: makeDirty,
            updateEntry: updateEntry
        };
    }();

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