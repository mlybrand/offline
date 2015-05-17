var express = require('express'),
    app = express();

app.get('/', function(req, res) {
    res.send('<div id="page-heading">Hello World</div>');
});

module.exports = app;