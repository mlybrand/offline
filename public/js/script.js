$(function () {
    console.log(ASQ);
    var db;
    var openDb = function() {
        var request = indexedDB.open('inventory', 1);
        request.onsuccess = function(e) {
            db = e.target.result;
        };
        request.onupgradeneeded = function(e) {
            db = e.target.result;
            db.createObjectStore('items', {
                keyPath: 'id'
            });
        };
    };
    openDb();

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
            checkOnline().always(function(check) {
                if (check && check.connected) {
                    $.ajax({
                        url: '/api/items/new',
                        method: 'POST',
                        data: JSON.stringify(obj),
                        contentType: 'application/json'
                    })
                    .always(function(data) {
                        console.log(data);
                    });
                } else {
                    console.log('not connected');
                }
            });

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
            var obj = {
                id: activeItem.id(),
                name: activeItem.name(),
                rating: activeItem.rating()
            };
            checkOnline().always(function(check) {
                if (check && check.connected) {
                    $.ajax({
                        url: '/api/items/' +  obj.id,
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
            });
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
            if (confirm('Do you really want to delete item' + self.id())) {
                checkOnline().always(function(check) {
                    if (check && check.connected) {
                        $.ajax({
                            url: '/api/items/' + self.id() + '/delete',
                            method: 'POST'
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
                });

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

    // what I really need is something like checkOnline().then(syncDatabase).finally(function(){...
    // if checkonline is false or if it is true but we are not coming from an offline state
    // then sync does nothing, otherwise it should sync
    checkOnline().always(function(check) {
        console.log(check);
        //syncDatabase().always(function() {
            setTimeout(getAllItems, 0); // HACK: doing this to get this on the queue after call to open db
        //});
    });

    ASQ()
        .then(function(done) {
            console.log("i am first");
            done();
        })
        .then(function() {
            console.log("i am second");
        });

    function getAllItems() {
        var read = db.transaction(['items'], 'readonly'),
            objectStore = read.objectStore('items'),
            localData = { inventory: [] };

        objectStore.openCursor().onsuccess = function(e) {
            var cursor = e.target.result;
            if (cursor === null) { return; }
            localData.inventory.push({
                id: cursor.value.id,
                name: cursor.value.name,
                rating: cursor.value.rating
            });
            cursor.continue();
        };
        read.oncomplete = function() {
            ko.mapping.fromJS(localData, {}, vm);
            ko.applyBindings(vm);
        };

    }

    function checkOnline() {
        var ret = $.ajax({
            url: '/api/connect'
        });
        ret.done(function() {
            if (!!localStorage.getItem('wasOffline')) {
                syncDatabase();
                localStorage.removeItem('wasOffline');
            }
        });
        ret.error(function() {
            localStorage.setItem('wasOffline', 'true');;
        });

        return ret;
    }

    function syncDatabase() {
        $.ajax({
            url: '/api/items'
        })
            .done(function(data) {
                var tx = db.transaction(['items'], 'readwrite'),
                    objectStore = tx.objectStore('items');
                objectStore.clear();

                data.inventory.forEach(function(item) {
                    objectStore.add(item);
                });
            });
    }

});