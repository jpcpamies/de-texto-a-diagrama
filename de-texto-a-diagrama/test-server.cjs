const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  res.writeHead(200, {
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*'
  });
  
  res.end(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Test Server</title>
    </head>
    <body>
      <h1>¡Servidor funcionando!</h1>
      <p>Si ves esto, el puerto y la conectividad funcionan correctamente.</p>
      <p>El problema está en la configuración de Vite/React.</p>
      <p>Hora: ${new Date().toLocaleString()}</p>
    </body>
    </html>
  `);
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`✅ Servidor de prueba corriendo en http://localhost:${PORT}`);
  console.log(`✅ También disponible en http://127.0.0.1:${PORT}`);
});

server.on('error', (err) => {
  console.error('❌ Error del servidor:', err);
});