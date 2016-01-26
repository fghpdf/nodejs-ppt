var pool = require('./mysql-pooling');

var query = function(select, table ,callback){
    var selectSQL = "select " + select + " from " + table + ";";
    console.log(selectSQL);
    pool.getConnection(function(err, conn){
        if(err){
            callback(err, null, null);
        }else{
            conn.query(selectSQL, function(qerr, vals, fields){
                conn.release();
                console.log(vals);
                callback(qerr, vals, fields);
            });
        }
    });
};

module.exports = query;