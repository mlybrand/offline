var express = require('express'),
    app = express(),
    api = require('./api');

app.use(express.static("public"));
app.use('/api', api);

app.set("view engine", "jade");
if (app.get('env') === "development") {
    app.locals.pretty = true;
}

app.get('/', function(req, res) {
    res.render("main");
});


module.exports = app;