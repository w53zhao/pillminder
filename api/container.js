const db = require('../database/config');
const connection = db.getConnection();

const OPEN_CONTAINER = "UPDATE container SET last_opened = $1 WHERE id = $2";

module.exports = {
    open: function(id, time) {
        return connection.query(OPEN_CONTAINER, [time, id])
            .then(function() {
                return true;
            });
    }
};