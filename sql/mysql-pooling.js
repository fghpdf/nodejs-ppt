//连接池
var mysql = require('mysql');
var pool = mysql.createPool({
    host: '120.27.112.12',
    user: 'nodejs',
    password: 'nodejs',
    database:'nodejs',
    port: 3306
});

//mysql操作
var query = function(sql, callback){
    pool.getConnection(function(err, conn){
        if(err){
            callback(err, null, null);
        }else{
            conn.query(sql, function(qerr, vals, fields){
                conn.release();
                callback(qerr, vals, fields);
            });
        }
    });
};

module.exports = query;