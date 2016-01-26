var pool = require('./mysql-pooling');
var query = require('./mysql-query');

var add = function(email, passowrd ,callback){
    var distinSQL = "select u_id from users where e_mail=\'" + email + "'\;";
    query(distinSQL, function(err, row, fields){

    })
    var selectSQL = "insert into users(e_mail,password) values(\'" + email + "\',\'" + passowrd + "\');";
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

module.exports = add;