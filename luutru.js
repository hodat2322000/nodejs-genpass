const http = require('http');
const fs = require('fs');
const crypto = require('crypto');

function generatePassword(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charsLength = chars.length;
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charsLength);
    password += chars[randomIndex];
  }
  console.log(password);

  return password;
}

http.createServer(function (req, res) {
  if (req.url === '/') {
    fs.readFile('index.html', function(err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  } else if (req.url === '/generate-password') {
    const password = generatePassword(10);

    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(password);
    return res.end();
  }
}).listen(8080);
