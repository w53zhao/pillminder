const pg = require('pg-promise')();

const config = {
    ssl: true,
    host: 'ec2-107-20-250-195.compute-1.amazonaws.com',
    port: 5432,
    database: 'd6b4lekmocscls',
    user: 'jydmufgudgfmsm',
    password: 'a628a29624951f6fb480b87daf6af0f4cac059e44ea608b5890e20e335ff68b9'
};
const db = pg(config);

module.exports = {
    getConnection: function() {
        return db;
    }
};
