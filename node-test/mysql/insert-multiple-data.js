var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //Make SQL statement:
  var sql = "INSERT INTO customers (custnumber, name, address) VALUES ?";
  //Make an array of values:
  var values = [
    ['1001','John', 'Highway 71'],
    ['1002','Peter', 'Lowstreet 4'],
    ['1003','Amy', 'Apple st 652'],
    ['1004','Hannah', 'Mountain 21'],
    ['1005','Michael', 'Valley 345'],
    ['1006','Sandy', 'Ocean blvd 2'],
    ['1007','Betty', 'Green Grass 1'],
    ['1008','Richard', 'Sky st 331'],
    ['1009','Susan', 'One way 98'],
    ['1010','Vicky', 'Yellow Garden 2'],
    ['1011','Ben', 'Park Lane 38'],
    ['1012','William', 'Central st 954'],
    ['1013','Chuck', 'Main Road 989'],
    ['1014','Viola', 'Sideway 1633']
  ];
  //Execute the SQL statement, with the value array:
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
  });
});
