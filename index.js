const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const container = require('./api/container');
const user = require('./api/user');

var HttpStatus = require('http-status-codes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', function(req, res) {
   var email = req.body.email;
   var password = req.body.password;

   user.login(email, password)
       .then(function(success) {
           res.send({
               'success': success
           });
       })
       .catch(function(error) {
           res.send({
               'success': false,
               'error': error
           });
       });
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

app.get('/:id/remind', function(req, res) {
   var id = req.params.id;

   container.remind(id)
       .then(function(remind) {
           res.send({
               'success': true,
               'remind': remind
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

    container.open(id)
        .then(function() {
            res.status(HttpStatus.OK).send();
        })
        .catch(function(error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error);
        });
});

app.listen(process.env.PORT || 5000);