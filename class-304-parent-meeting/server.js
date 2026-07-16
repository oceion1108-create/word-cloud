const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]');

function getWords() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function addWord(word) {
  const words = getWords();
  words.push(word);
  fs.writeFileSync(DATA_FILE, JSON.stringify(words));
  return words;
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  if (req.method === 'GET' && req.url === '/api/words') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(getWords()));
    return;
  }

  if (req.method === 'POST' && req.url === '/api/words') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => {
      try {
        const { word } = JSON.parse(body);
        if (!word) { res.writeHead(400); res.end('{"error":"empty"}'); return; }
        addWord(word);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch { res.writeHead(400); res.end('{"error":"invalid"}'); }
    });
    return;
  }

  let filePath = req.url === '/' ? '/index.html' : req.url;
  filePath = path.join(__dirname, filePath);
  const ext = path.extname(filePath);

  if (!fs.existsSync(filePath)) {
    res.writeHead(404); res.end('Not Found');
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  res.end(content);
}).listen(PORT, () => {
  const ip = Object.values(os.networkInterfaces()).flat()
    .find(i => i.family === 'IPv4' && !i.internal)?.address || 'localhost';
  console.log(`\n  伺服器已啟動！`);
  console.log(`  本機開啟: http://localhost:${PORT}`);
  console.log(`  手機開啟: http://${ip}:${PORT}`);
  console.log(`  按 Ctrl+C 停止\n`);
});
