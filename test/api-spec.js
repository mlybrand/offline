var expect = require('chai').expect,
    config = require('./integration-test-config'),
    app = config.app,
    port = config.port,
    url = config.url,
    supertest = require('supertest'),
    api = supertest(url + "/api");

describe('API', function() {
    var server;

    before(function() {
        server = app.listen(port);
    });

    after(function() {
        server.close();
    });

    describe('List', function() {
        it('should return json with an inventory member', function(done) {
            api.get('/items')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function(res){
                    if (!('inventory' in res.body)) {
                        throw new Error('missing inventory');
                    }
                })
                .end(done);
        });
        describe("Inventory", function() {
            it("should have at least one member", function(done) {
                api.get('/items')
                    .expect(function(res) {
                        if (res.body.inventory.length <= 0) {
                            throw new Error('no items in inventory');
                        }
                    })
                    .end(done);
            });
            describe("Items", function() {
                it("should have id, name and rating members", function(done) {
                    api.get('/items')
                        .expect(function(res) {
                            var inventory = res.body.inventory;
                            inventory.forEach(function(item) {
                                if (!('id' in item)) throw new Error('no id');
                                if (!('name' in item)) throw new Error('no name');
                                if (!('rating' in item)) throw new Error('no rating');
                            });
                        })
                        .end(done);
                });
            })
        });
    });

    describe('Create', function() {
        it('should be called with a new item and return an object with a status of ok and the submitted item with a new item number', function(done) {
            api.post('/items/new')
                .send({id: 'New Item', name: 'Foo', rating: 5 })
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(res) {
                    if (!('status' in res.body)) throw new Error('no status');
                    if (!('item' in res.body)) throw new Error('no item');
                    if(res.body.status !== 'ok') throw new Error('status is not ok');
                    if(!res.body.item.id.match(/^\d{7}$/)) throw new Error('id is malformed');
                    if(res.body.item.name !== 'Foo') throw new Error('name is wrong');
                    if(res.body.item.rating !== 5) throw new Error('rating is wrong');
                })
                .end(done);
        });
    });

    describe('Update', function() {
        it('should be called with an existing item and return an object with a status and the submitted item', function(done) {
            api.post('/items/0000001')
                .send({id: '0000001', name: 'Foo', rating: 3 })
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(res) {
                    if(!('status' in res.body)) throw new Error('no status');
                    if(!('item' in res.body)) throw new Error('no item');
                    if(res.body.status !== 'ok') throw new Error('status is not ok');
                    if(res.body.item.id !== '0000001') throw new Error('incorrect id');
                    if(res.body.item.name !== 'Foo') throw new Error('incorrect name');
                    if(res.body.item.rating !== 3) throw new Error('incorrect rating');
                })
                .end(done);
        });
    });

    describe('Delete', function() {
        it('should be called with an id number and return an object with a status and the deleted object', function(done) {
            api.post('/items/0000001/delete')
                .expect(200)
                .expect('Content-Type', /json/)
                .expect(function(res) {
                    if(!('status' in res.body)) throw new Error('no status');
                    if(!('item' in res.body)) throw new Error('no item');
                    if(res.body.status !== 'ok') throw new Error('status is not ok');
                    if(res.body.item.id !== '0000001') throw new Error('incorrect id');
                    if(!('name' in res.body.item)) throw new Error('no name');
                    if(!('rating' in res.body.item)) throw new Error('no rating');
                })
                .end(done);
        });
    });
});

