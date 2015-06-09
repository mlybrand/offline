var express = require('express'),
    bodyParser = require('body-parser');
    app = express(),
    db = require('./db'),
    api = require('./api');

app.use(bodyParser.json());
app.use(express.static("public"));
app.use('/api', api);

app.set("view engine", "jade");
if (app.get('env') === "development") {
    app.locals.pretty = true;
}

app.get('/manifest.appcache', function(req, res) {
    res.set('Content-Type', 'text/cache-manifest');
    res.sendFile('/public/manifest.appcache');
});
app.get('/', function(req, res) {
    res.render("main");
});


module.exports = app;