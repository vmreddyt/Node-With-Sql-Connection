var db = require("../core/db");
var httpMsgs = require("../core/httpMsgs");
var util = require("util");

exports.getList = function(req, resp) {
  db.executeSql("SELECT * FROM customers", function(data, err) {
    if (err) {
      httpMsgs.show500(req, resp, err);
    } else {
      httpMsgs.sendJson(req, resp, data);
    }
  })
}

exports.get = function(req, resp, custno) {
  db.executeSql("SELECT * FROM customers WHERE custnumber =" + custno, function(data, err) {
    if (err) {
      httpMsgs.show500(req, resp, err);
    } else {
      httpMsgs.sendJson(req, resp, data);
    }
  })
}

exports.add = function(req, resp, reqBody) {
  try {
    if (!reqBody) throw new Error("Input not vallid");
    var data = JSON.parse(reqBody);
    if (data) {
      var sql = "INSERT INTO customers (custnumber, name, address) VALUES";
      sql += util.format("('%d', '%s', '%s')", data.custnumber, data.name, data.address);

      db.executeSql(sql, function(data, err) {
        if (err) {
          httpMsgs.show500(req, resp, err);
        } else {
          httpMsgs.send200(req, resp, data);
        }
      })

    } else {
      throw new Error("Input not vallid");
    }
  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
}

exports.update = function(req, resp, reqBody) {
  try {
    if (!reqBody) throw new Error("Input not vallid");
    var data = JSON.parse(reqBody);
    if (data) {
      if (!data.custnumber) throw new Error("Customer number not provided");
      var sql = "UPDATE customers SET";
      var isDataProvided = false;
      if (data.name) {
      	sql+= " name ='"+ data.name +"',";
      	isDataProvided = true;
      }
      if (data.address) {
      	sql+= " address ='"+ data.address +"',";
      	isDataProvided = true;
      }

      sql = sql.slice(0,-1); //remove last comma
      sql+= "WHERE custnumber =" + data.custnumber;

      db.executeSql(sql, function(data, err) {
        if (err) {
          httpMsgs.show500(req, resp, err);
        } else {
          httpMsgs.send200(req, resp, data);
        }
      })

    } else {
      throw new Errorx("Input not vallid");
    }
  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
}

exports.delete = function(req, resp, reqBody) {
  try {
    if (!reqBody) throw new Error("Input not vallid");
    var data = JSON.parse(reqBody);
    if (data) {
      if (!data.custnumber) throw new Error("Customer number not provided");
      var sql = "DELETE FROM customers ";
      
      sql+= "WHERE custnumber =" + data.custnumber;

      db.executeSql(sql, function(data, err) {
        if (err) {
          httpMsgs.show500(req, resp, err);
        } else {
          httpMsgs.send200(req, resp, data);
        }
      })

    } else {
      throw new Errorx("Input not vallid");
    }
  } catch (ex) {
    httpMsgs.show500(req, resp, ex);
  }
}