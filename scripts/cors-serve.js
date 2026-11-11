const http = require('http');
const fs = require('fs');
const path = require('path');

const dir = path.resolve(__dirname, '..', 'deploy', 'b64');

http
  .createServer((req, res) => {
    const headers = {
      'Access-Control-Allow-Origin': 'https://www.houstoninfinitytaxservices.com',
      'Access-Control-Allow-Private-Network': 'true',
      'Access-Control-Allow-Methods': 'GET',
      'Cache-Control': 'no-store',
    };
    if (req.method === 'OPTIONS') {
      res.writeHead(204, headers);
      return res.end();
    }
    const name = path.basename(decodeURIComponent(req.url.split('?')[0]));
    const file = path.join(dir, name);
    if (!name.endsWith('.b64') || !fs.existsSync(file)) {
      res.writeHead(404, headers);
      return res.end();
    }
    res.writeHead(200, { ...headers, 'Content-Type': 'text/plain' });
    fs.createReadStream(file).pipe(res);
  })
  .listen(8092, '127.0.0.1');
