var settings = require("../settings");

exports.show500 = function(req, resp, err) {
  if (settings.httpMsgFormat === "HTML") {
    resp.writeHead(500, "Interenal Error occurred", { 'Content-Type': 'text/html' });
    resp.write("<html><head><title>500</title></head><body>500: Interenal Error. Details: " + err + "</body></html>");
  } else {
    resp.writeHead(500, "Interenal Error occurred", { 'Content-Type': 'application/JSON' });
    resp.write(JSON.stringify({ data: "Error occurred:" + err }));
  }
  resp.end();
}

exports.sendJson = function(req, resp, data) {
  resp.writeHead(200, { 'Content-Type': 'application/json' });
  if (data) {
    resp.write(JSON.stringify(data));
  }
  resp.end();
}

exports.show405 = function(req, resp) {
  if (settings.httpMsgFormat === "HTML") {
    resp.writeHead(405, "Method Not Supported", { 'Content-Type': 'text/html' });
    resp.write("<html><head><title>405</title></head><body>405: Method Not Supported</body></html>");
  } else {
    resp.writeHead(405, "Method Not Supported", { 'Content-Type': 'application/JSON' });
    resp.write(JSON.stringify({ data: "Method Not Supported" }));
  }
  resp.end();
}

exports.show404 = function(req, resp) {
  if (settings.httpMsgFormat === "HTML") {
    resp.writeHead(404, "Resource Not Found", { 'Content-Type': 'text/html' });
    resp.write("<html><head><title>404</title></head><body>404: Resource Not Found</body></html>");
  } else {
    resp.writeHead(404, "resource Not Found", { 'Content-Type': 'application/JSON' });
    resp.write(JSON.stringify({ data: "Resource Not Found" }));
  }
  resp.end();
}

exports.show413 = function(req, resp) {
  if (settings.httpMsgFormat === "HTML") {
    resp.writeHead(413, "Request Entity Too Large", { 'Content-Type': 'text/html' });
    resp.write("<html><head><title>413</title></head><body>413: Request Entity Too Large</body></html>");
  } else {
    resp.writeHead(413, "Request Entity Too Large", { 'Content-Type': 'application/JSON' });
    resp.write(JSON.stringify({ data: "Request Entity Too Large" }));
  }
  resp.end();
}

exports.send200 = function(req, resp) {
  resp.writeHead(200, { 'Content-Type': 'application/JSON' });
  resp.end();
}

exports.showHome = function(req, resp) {
  if (settings.httpMsgFormat === "HTML") {
    resp.writeHead(200, { 'Content-Type': 'text/html' });
    resp.write("<html><head><title>200</title></head><body>Valid endpoints: <br> /customers - GET - To List All Customers <br> /customer/custid - GET - To get Customer full details</body></html>");
  } else {
    resp.writeHead(200, "Interenal Error occurred", { 'Content-Type': 'application/JSON' });
    resp.write(JSON.stringify([
      { url: "/customers", operation: "GET", description: "To List All Customers" },
      { url: "/customers/custid", operation: "GET", description: "To get Customer full details" }
    ]));
  }
  resp.end();
}