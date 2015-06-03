$(function () {
    var vm = function() {
        var connected = true;
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
            var itemWithMaxId = (_.max(inventory(), function(item) {
                return item.id();
            })),
                maxId =  itemWithMaxId.id ? itemWithMaxId.id() : 0,
                nextId = "0000000" +  (parseInt(maxId, 10) + 1);
            return nextId.substr(nextId.length - 7);
        }

        /* CREATE */
        var addEntry = function(item) {
            var obj = {
                id: item.id(),
                name: item.name(),
                rating: item.rating()
            };
            // call local storage and update
            // if connected call api
            if (connected) {
                $.ajax({
                    url: '/api/items/new',
                    method: 'POST',
                    data: JSON.stringify(obj),
                    contentType: 'application/json'
                })
                .done(function() {
                    console.log('done');
                })
                .fail(function() {
                    console.log('fail');
                })
                .always(function() {
                    console.log('always');
                });
            }
            // update vm

            item.id(generateNextId());
            inventory.push({
                id: ko.observable(item.id()),
                name: ko.observable(item.name()),
                rating: ko.observable(item.rating()),
                dirty: ko.observable(false)
            });
            resetForm();
        };

        /* UPDATE */
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

        /* DELETE */
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
    .done(function(data) {
        ko.mapping.fromJS(data, {}, vm);
        ko.applyBindings(vm);
    });

});