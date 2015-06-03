var express = require('express'),
    router = express.Router(),
    Item = require('mongoose').model('Item');

router.get('/items', function(req, res) {
    //var obj = {
    //    inventory: [
    //        {
    //            id: '0000001',
    //            name: 'desk',
    //            rating: 9
    //        },
    //        {
    //            id: '0000002',
    //            name: 'monitor',
    //            rating: 8
    //        },
    //        {
    //            id: '0000003',
    //            name: 'printer',
    //            rating: 4
    //        },
    //        {
    //            id: '0000004',
    //            name: 'telephone',
    //            rating: 4
    //        },
    //        {
    //            id: '0000005',
    //            name: 'mouse',
    //            rating: 10
    //        },
    //        {
    //            id: '0000006',
    //            name: 'keyboard',
    //            rating: 1
    //        }
    //    ]
    //};
    Item.find({}, null, { sort: 'id'     }, function(err, items) {
        if (err) {
            throw err;
        }
        var obj = {
            inventory: items
        };
        res.status(200).send(obj);
    });
});
router.post('/items/new', function(req, res) {
    var obj = req.body;
    console.log(obj);
    // get next id
    var nextId = 0;
    Item.find({}, 'id', { sort: { id: -1 }}, function(err, items) {
        if (err) {
            throw err;
        }
        if(items.length > 0) {
            nextId = parseInt(items[0].id, 10);
        }
        nextId++;
        nextId = '0000000' + nextId;
        nextId = nextId.substr(nextId.length - 7);
        obj.id = nextId;
        console.log(obj);
        Item.create(obj, function(err, item) {
            if (err) {
                throw err;
            } else {
                console.log(item);
            }
        })
    });

    // update id field
    // call user collection to add
    res.status(200).send({ status: 'ok', item: obj });
});
router.post('/items/:id', function(req, res) {
    var obj = req.body;
    res.status(200).send({ status: 'ok', item: { id: req.params.id, name: obj.name, rating: obj.rating } });
});
router.post('/items/:id/delete', function(req, res) {
   res.status(200).send({ status: 'ok', item: { id: req.params.id, name: null, rating: null } });
});

module.exports = router;