var express = require('express'),
    app = express();

app.use(express.static("public"));
app.set("view engine", "jade");
if (app.get('env') === "development") {
    app.locals.pretty = true;
}

app.get('/', function(req, res) {
    res.render("main");
});

app.route('/api/items')
    .get(function(req, res) {
        res.status(200).send(
            { name: 'tobi' }
        );
    });


module.exports = app;