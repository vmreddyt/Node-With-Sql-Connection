var sqlDb = require('mysql');
var settings = require('../settings');

exports.executeSql = function(sql, callback) {
  var conn = new sqlDb.createConnection(settings.dbConfig);
  conn.connect(function(err) {
    if (err) {

      console.log(err);
      callback(null, err);

    } else {

      conn.query(sql, function(err, result, fields) {
        if (err) {
          console.log(err);
          callback(null, err);
        } else {
          callback(result);
        }
      })

    }
  });
}