var express = require('express'),
    router = express.Router(),
    Item = require('mongoose').model('Item');

router.get('/items', function(req, res) {
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
    var obj = req.body,
        nextId = 0;
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
        Item.create(obj, function(err, item) {
            if (err) {
                throw err;
            } else {
                res.status(200).send({ status: 'ok', item: obj });
            }
        })
    });
});
router.post('/items/:id', function(req, res) {
    var id = req.params.id,
        obj = req.body;

    Item.findOneAndUpdate({id: id}, { 'name': obj.name, 'rating': obj.rating }, function(err, item) {
        if (err) {
            throw err;
        }
        res.status(200).send({ status: 'ok', item: { id: req.params.id, name: obj.name, rating: obj.rating } });
    });
});
router.post('/items/:id/delete', function(req, res) {
    var id = req.params.id;
    Item.findOneAndRemove({id: id}, function(err, item) {
        res.status(200).send({ status: 'ok', item: item });
    });
});

module.exports = router;