// const db_endpoint = "mongodb://localhost:27017/n2sky";
const host = require('./../HOST.json');

module.exports = {

    'secret': 'testsecret',
    'database': host.db_host,
    'options': {
        useMongoClient: true,
        db: {native_parser: true},
        server: {poolSize: 5},
        user: 'n2sky',
        pass: 'password'}

};
