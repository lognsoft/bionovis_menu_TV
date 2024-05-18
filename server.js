const WebSocket = require('ws');
const { spawn } = require('child_process');
const http = require('http');

// Configurações das câmeras
const streams = [
    { url: 'rtsp://admin:bruno123@192.168.2.233:554/cam/realmonitor?channel=1&subtype=0', port: 8082 },
    { url: 'rtsp://admin:bruno123@192.168.2.233:554/cam/realmonitor?channel=1&subtype=0', port: 8083 },
    // Adicione outros streams aqui
];

// Iniciando servidores WebSocket para cada câmera
streams.forEach(stream => {
    const server = new WebSocket.Server({ port: stream.port });
    server.on('connection', (socket) => {
        console.log(`Cliente conectado ao WebSocket na porta ${stream.port}`);
        const ffmpeg = spawn('ffmpeg', [
            '-rtsp_transport', 'tcp',
            '-i', stream.url,
            '-f', 'mpegts',
            '-codec:v', 'mpeg1video',  
            '-s', '2560x1440',         
            '-b:v', '50000k',          
            '-r', '60',                
            '-bf', '0',
            '-codec:a', 'mp2',         
            '-ar', '48000',            
            '-ac', '2',                
            '-b:a', '320k',            
            '-f', 'mpegts',
            'pipe:1'
        ]);

        ffmpeg.stdout.on('data', (data) => {
            socket.send(data, { binary: true });
        });

        ffmpeg.stderr.on('data', (data) => {
            console.error(`ffmpeg stderr: ${data}`);
        });

        ffmpeg.on('error', (error) => {
            console.error(`FFmpeg process error: ${error.message}`);
        });

        ffmpeg.on('exit', (code, signal) => {
            console.log(`FFmpeg process exited with code ${code} and signal ${signal}`);
        });

        socket.on('close', () => {
            console.log("Cliente desconectado do WebSocket");
            ffmpeg.kill('SIGINT');
        });

        socket.on('error', (err) => {
            console.error('WebSocket error: ', err);
        });
    });
});

// Criando um servidor HTTP para listar as portas
const server = http.createServer((req, res) => {
    if (req.url === '/ports') {
        const ports = streams.map(stream => stream.port);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ports));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Servidor HTTP ouvindo na porta 3000');
});