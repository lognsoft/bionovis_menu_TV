const WebSocket = require('ws');
const { spawn } = require('child_process');

// Configurações das câmeras
const streams = [
    { url: 'rtsp://admin:bruno123@192.168.2.233:554/cam/realmonitor?channel=1&subtype=0', port: 8082 },
    // { url: 'rtsp://endereco_do_seu_stream2', port: 8083 },
    // { url: 'rtsp://endereco_do_seu_stream3', port: 8084 },
    // { url: 'rtsp://endereco_do_seu_stream4', port: 8085 }
];

// Para cada câmera, criamos um servidor WebSocket e usamos o FFmpeg para capturar e converter o stream
streams.forEach(stream => {
    const server = new WebSocket.Server({ port: stream.port });

    server.on('connection', (socket) => {

        const ffmpeg = spawn('DriverVideoffmpeg', [
            '-rtsp_transport', 'tcp',
            '-i', stream.url,
            '-f', 'mpegts',
            '-codec:v', 'mpeg1video',
            '-s', '3840x2160',  
            '-b:v', '15000k',   
            '-r', '60',        
            '-bf', '0',
            '-codec:a', 'mp2',
            '-ar', '48000',     
            '-ac', '2',        
            '-b:a', '320k',     
            '-f', 'mpegts',
            'pipe:1'
        ]);

        // Enviando os dados convertidos para o WebSocket
        ffmpeg.stdout.on('data', (data) => {
            socket.send(data);
        });

        // Finalizando o processo do FFmpeg quando a conexão WebSocket é fechada
        socket.on('close', () => {
            ffmpeg.kill('SIGINT');
        });
    });
});

