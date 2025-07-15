#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys

# Cambiar al directorio dist
os.chdir('dist')

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Añadir headers CORS para evitar problemas
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()
    
    def log_message(self, format, *args):
        print(f"📊 {self.client_address[0]} - {format%args}")

print(f"🚀 Iniciando servidor en puerto {PORT}")
print(f"📁 Sirviendo archivos desde: {os.getcwd()}")
print(f"🌐 Abre tu navegador en: http://localhost:{PORT}")
print(f"🌐 También disponible en: http://127.0.0.1:{PORT}")
print("💡 Presiona Ctrl+C para detener el servidor")

try:
    with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\n🛑 Servidor detenido")
except OSError as e:
    if e.errno == 48:  # Address already in use
        print(f"❌ Puerto {PORT} ya está en uso. Intenta con otro puerto.")
    else:
        print(f"❌ Error: {e}")