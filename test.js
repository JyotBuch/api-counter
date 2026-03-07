const app = require('./index');
const http = require('http');

const server = app.listen(4000, () => {
  // Test 1: health check
  http.get('http://localhost:4000/health', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      console.assert(JSON.parse(data).status === 'ok', '❌ health failed');
      console.log('✅ /health passes');
    });
  });

  // Test 2: increment
  setTimeout(() => {
    const req = http.request({
      hostname: 'localhost', port: 4000,
      path: '/increment', method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const body = JSON.parse(data);
        console.assert(body.count === 1, '❌ increment failed');
        console.log('✅ /increment passes');
        server.close();
        process.exit(0);
      });
    });
    req.write(JSON.stringify({}));
    req.end();
  }, 300);
});