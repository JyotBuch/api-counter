const app = require('./index');
const http = require('http');

const server = app.listen(4000, () => {
  http.get('http://localhost:4000/health', (res) => {
    let data = '';
    res.on('data', c => data += c);
    res.on('end', () => {
      const body = JSON.parse(data);
      if (body.status === 'ok') {
        console.log('✅ /health passes');
        server.close();
        process.exit(0);
      } else {
        console.error('❌ /health failed');
        server.close();
        process.exit(1);
      }
    });
  });
});