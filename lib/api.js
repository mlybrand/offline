var express = require('express'),
    router = express.Router();

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
    var obj = {
        inventory: []
    }
    res.status(200).send(obj);
});
router.post('/items/new', function(req, res) {
    var obj = req.body;
    // get next id
    //Item.find({})
    // update id field
    // call user collection to add
    res.status(200).send({ status: 'ok', item: { id: '1234567', name: obj.name, rating: obj.rating } });
});
router.post('/items/:id', function(req, res) {
    var obj = req.body;
    res.status(200).send({ status: 'ok', item: { id: req.params.id, name: obj.name, rating: obj.rating } });
});
router.post('/items/:id/delete', function(req, res) {
   res.status(200).send({ status: 'ok', item: { id: req.params.id, name: null, rating: null } });
});

module.exports = router;