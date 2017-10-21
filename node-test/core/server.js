var http = require("http");
var cust = require("../controllers/customers");
var settings = require('../settings');
var httpMsgs = require("./httpMsgs");

http.createServer(function(req, resp) {
  switch (req.method) {
    case "GET":
      if (req.url === "/") {
        httpMsgs.showHome(req, resp);
      } else if (req.url === "/customers") {
        cust.getList(req, resp);
      } else {
        var custNoPatt = "[0-9]+";
        var patt = new RegExp("/customers/" + custNoPatt);
        if (patt.test(req.url)) {
          patt = new RegExp(custNoPatt);
          var custNo = patt.exec(req.url);
          cust.get(req, resp, custNo);
        } else {
          httpMsgs.show404(req, resp);
        }
      }
      break;
    case "POST":
      if (req.url === "/customers") {
        var reqBody = '';
        req.on('data', function(data) {
          reqBody += data;
          if (reqBody.length > 1e7) //10mb
          {
            httpMsgs.show413(req, resp);
          }
        });
        req.on('end', function() {
          cust.add(req, resp, reqBody);
        });
      } else {
        httpMsgs.show404(req, resp);
      }
      break;
    case "DELETE":
      if (req.url === "/customers") {
        var reqBody = '';
        req.on('data', function(data) {
          reqBody += data;
          if (reqBody.length > 1e7) //10mb
          {
            httpMsgs.show413(req, resp);
          }
        });
        req.on('end', function() {
          cust.delete(req, resp, reqBody);
        });
      } else {
        httpMsgs.show404(req, resp);
      }
      break;
    case "PUT":
      if (req.url === "/customers") {
        var reqBody = '';
        req.on('data', function(data) {
          reqBody += data;
          if (reqBody.length > 1e7) //10mb
          {
            httpMsgs.show413(req, resp);
          }
        });
        req.on('end', function() {
          cust.update(req, resp, reqBody);
        });
      } else {
        httpMsgs.show404(req, resp);
      }
      break;
    default:
      httpMsgs.show405(req, resp);
      break;
  }
}).listen(settings.webPort, settings.webHost, function() {
  console.log('Started listening at port:' + settings.webPort + ' Hostname: ' + settings.webHost);
  console.log(`Try the following way to access in the browser : ${settings.webHost}:${settings.webPort}`)
});