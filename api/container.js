const db = require('../database/config');
const connection = db.getConnection();

const OPEN_CONTAINER = "UPDATE container SET last_opened = $1 WHERE id = $2";
const REMIND = "SELECT last_opened, frequency FROM container WHERE id = $1";

module.exports = {
    open: function(id, time) {
        return connection.query(OPEN_CONTAINER, [time, id])
            .then(function() {
                return true;
            });
    },

    remind: function(id) {
        return connection.query(REMIND, [id])
            .then(function(rows) {
                var now = Math.floor(new Date()/1000);
                if (now - rows[0].last_opened > rows[0].frequency * 3600) return true;
                else return false;
            });
    }
};