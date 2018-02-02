const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const container = require('./api/container');
const user = require('./api/user');

app.get('/', function(req, res) {
    res.send("Hello World!");
});

app.get('/containers/:id', function(req, res) {
    var id = req.params.id;

    user.getContainers(id)
        .then(function(containers) {
            res.send({
                'success': true,
                'data': containers
            });
        })
        .catch(function(error) {
            res.send({
                'success': false,
                'error': error
            });
        });
});

app.get('/remind/:id', function(req, res) {
   var id = req.params.id;

   container.remind(id)
       .then(function(remind) {
           res.send({
               'success': true,
               'data': {
                   'remind': remind
               }
           });
       })
       .catch(function(error) {
            res.send({
                'success': false,
                'error': error
            });
       });
});

app.post('/:id/open', function(req, res) {
    var id = req.params.id;
    var time = req.params.time;

    container.open(id)
        .then(function() {
            res.send({
                'success': true
            });
        })
        .catch(function(error) {
            res.send({
                'success': false,
                'error': error
            });
        });
});

app.listen(process.env.PORT || 5000);