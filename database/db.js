var knex = require('knex')({
    client:'mysql',
    connection:{
        host:'120.27.112.12',
        user:'nodejs',
        password:'nodejs',
        database:'nodejs',
        charset:'utf8'
    },
    pool:{
        min: 0,
        max: 7
    },
    acquireConnectionTimeout: 10000
});

var bookshelf = require('bookshelf')(knex);

module.exports.db = bookshelf;