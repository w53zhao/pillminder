const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const container = require('./api/container');

app.get('/', function(req, res) {
    res.send("Hello World!");
});

app.post('/open/:id/:time', function(req, res) {
    var id = req.params.id;
    var time = req.params.time;

    container.open(id, time)
        .then(function() {
            res.send({'success': true});
        })
        .catch(function(error) {
            res.send({'success': false, 'error': error});
        });
});

app.listen(process.env.PORT || 5000);