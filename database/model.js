var db = require('./db').db;

var User = db.Model.extend({
    tableName:'company',
    idAttribute:'id'
});

module.exports = {
    User: User
};