const db = require('../database/config');
const connection = db.getConnection();
const Container = require('../container');

const GET_CONTAINERS = "SELECT * FROM container WHERE user_id = $1";

module.exports = {
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