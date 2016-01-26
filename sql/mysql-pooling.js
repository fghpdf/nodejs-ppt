//连接池
var mysql = require('mysql');
var pool = mysql.createPool({
    host: '120.27.112.12',
    user: 'nodejs',
    password: 'nodejs',
    database:'nodejs',
    port: 3306
});

module.exports = pool;