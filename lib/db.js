var mongoose = require('mongoose'),
    dbURI = 'mongodb://localhost/offline';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
    console.log("Mongoose connected to " + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log("Mongoose connection error: " + err);
});

mongoose.connection.on('disconnected', function() {
    console.log("Mongoose terminated");
});

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconnected through app termination");
        process.exit(0);
    });
});

var itemSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    //},
    //timestamp: {
    //    type: Date,
    //    required: true
    }
});
mongoose.model('Item', itemSchema);