const http = require('http');
const fs = require('fs');
const path = require('path');

const DEFAULT_PORT = process.env.PORT || 4173;
const DEFAULT_HOST = '0.0.0.0';
const ROOT_DIR = path.join(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

function getSafePath(urlPath) {
  const requestPath = decodeURIComponent(urlPath.split('?')[0]);
  let normalizedPath = path.normalize(requestPath);

  if (normalizedPath === path.sep) {
    normalizedPath = '/';
  }

  if (normalizedPath === '/' || normalizedPath === '') {
    return '/index.html';
  }

  const withoutTraversal = normalizedPath.replace(/^(\.{2}[\/])+/, '');
  if (withoutTraversal === '' || withoutTraversal === '/') {
    return '/index.html';
  }

  return withoutTraversal.startsWith('/')
    ? withoutTraversal
    : `/${withoutTraversal}`;
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  const stream = fs.createReadStream(filePath);
  stream.on('open', () => {
    res.writeHead(200, { 'Content-Type': contentType });
  });
  stream.on('error', () => {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('서버에서 파일을 불러오는 중 오류가 발생했습니다.');
  });
  stream.pipe(res);
}

const server = http.createServer((req, res) => {
  const safePath = getSafePath(req.url);
  const requestedFile = path.join(ROOT_DIR, safePath);

  fs.stat(requestedFile, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('요청하신 페이지를 찾을 수 없습니다.');
      return;
    }

    if (stats.isDirectory()) {
      const indexFile = path.join(requestedFile, 'index.html');
      fs.stat(indexFile, (indexErr) => {
        if (indexErr) {
          res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
          res.end('디렉터리 목록은 제공되지 않습니다.');
          return;
        }
        sendFile(res, indexFile);
      });
      return;
    }

    sendFile(res, requestedFile);
  });
});

function startServer(options = {}) {
  const port = options.port || DEFAULT_PORT;
  const host = options.host || DEFAULT_HOST;
  const onReady = options.onReady;

  return server.listen(port, host, () => {
    if (typeof onReady === 'function') {
      onReady(server.address());
      return;
    }
    console.log(`로컬 미리보기 서버가 http://localhost:${port} 에서 실행 중입니다.`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = {
  startServer,
};
