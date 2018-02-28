const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const container = require('./api/container');
const user = require('./api/user');
const userError = require('./userError');

var HttpStatus = require('http-status-codes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signup', function(req, res) {
    var firstName = req.body.first_name;
    var lastName = req.body.last_name;
    var email = req.body.email;
    var password = req.body.password;

    user.signup(firstName, lastName, email, password)
        .then(function(userId) {
            res.status(HttpStatus.OK).send({'user_id': userId});
        })
        .catch(function(error) {
            if (error instanceof  userError) {
                res.status(error.status).send({'error': error.error});
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({'error': error});
            }
        });
});

app.post('/login', function(req, res) {
   var email = req.body.email;
   var password = req.body.password;

   user.login(email, password)
       .then(function(userId) {
           res.status(HttpStatus.OK).send({'user_id': userId});
       })
       .catch(function(error) {
           if (error instanceof userError) {
               res.status(error.status).send({'error': error.error});
           } else {
               res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({'error': error});
           }
       });
});

app.post('/:id/deviceToken', function(req, res) {
    var id = req.params.id;
    var deviceToken = req.body.device_token;

    user.addDeviceToken(id, deviceToken)
        .then(function(success) {
            res.status(HttpStatus.OK).send();
        })
        .catch(function(error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({"error": error});
        });
});

app.get('/:id/deviceToken', function(req, res) {
    var id = req.params.id;

    user.getDeviceToken(id)
        .then(function(deviceToken) {
            res.status(HttpStatus.OK).send({'device_token': deviceToken});
        })
        .catch(function(error) {
            if (error instanceof  userError) {
                res.status(error.status).send({'error': error.error});
            } else {
                res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({'error': error});
            }
        });
});

app.get('/:id/containers', function(req, res) {
    var id = req.params.id;

    user.getContainers(id)
        .then(function(containers) {
            res.status(HttpStatus.OK).send({'containers': containers});
        })
        .catch(function(error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({'error': error});
        });
});

app.get('/:id/remind', function(req, res) {
   var id = req.params.id;

   container.remind(id)
       .then(function(remind) {
           res.status(HttpStatus.OK).send({'remind': remind});
       })
       .catch(function(error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({'error': error});
       });
});

app.post('/:id/open', function(req, res) {
    var id = req.params.id;

    container.open(id)
        .then(function() {
            res.status(HttpStatus.OK).send();
        })
        .catch(function(error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({'error': error});
        });
});

app.listen(process.env.PORT || 5000);