$(function () {
    var vm = {
        inventory: ko.observableArray([])
    };

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