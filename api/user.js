const db = require('../database/config');
const connection = db.getConnection();
const Container = require('../container');

const GET_PASSWORD = "SELECT password FROM user_info WHERE email = $1";
const GET_CONTAINERS = "SELECT * FROM container WHERE user_id = $1";

module.exports = {
    login: function(email, password) {
        return connection.query(GET_PASSWORD, [email])
            .then(function(rows) {
                 if (rows.length == 1) {
                     return password == rows[0].password;
                 }
                 return false;
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