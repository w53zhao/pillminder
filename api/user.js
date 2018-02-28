const db = require('../database/config');
const connection = db.getConnection();
const Container = require('../container');
const UserError = require('../userError');
const HttpStatus = require('http-status-codes');

const GET_PASSWORD = "SELECT password, id FROM user_info WHERE email = $1";
const GET_DEVICE_TOKEN = "SELECT device_token FROM user_info WHERE id = $1";
const GET_CONTAINERS = "SELECT * FROM container WHERE user_id = $1";

module.exports = {
    login: function(email, password) {
        return connection.query(GET_PASSWORD, [email])
            .then(function(rows) {
                if (rows.length == 0) {
                    throw new UserError(HttpStatus.UNAUTHORIZED, "INVALID_EMAIL");
                } else if (rows[0].password != password) {
                    throw new UserError(HttpStatus.UNAUTHORIZED, "INVALID_PASSWORD");
                } else {
                    return rows[0].id;
                }
            });
    },

    getDeviceToken: function(id) {
        return connection.query(GET_DEVICE_TOKEN, [id])
            .then(function(rows) {
                if (rows.length == 0) {
                    throw new UserError(HttpStatus.NOT_FOUND, "INVALID_USER");
                } else {
                    return rows[0].device_token;
                }
            });
    },

    getContainers: function(id) {
        return connection.query(GET_CONTAINERS, [id])
            .then(function(rows) {
                var containers = [];
                for (var i = 0; i < rows.length; i++) {
                    containers.push(new Container(rows[i]));
                }
                return containers;
            });
    }
};