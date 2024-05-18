const WebSocket = require('ws');
const { spawn } = require('child_process');

// Configurações das câmeras
const streams = [
    { url: 'rtsp://admin:bruno123@192.168.2.233:554/cam/realmonitor?channel=1&subtype=0', port: 8082 },
    // Adicione outros streams aqui
];

// Para cada câmera, criamos um servidor WebSocket e usamos o FFmpeg para capturar e converter o stream
streams.forEach(stream => {
    const server = new WebSocket.Server({ port: stream.port });

    server.on('connection', (socket) => {
        const startTime = Date.now();
        let dataSent = 0;
        console.log(`Cliente conectado ao WebSocket na porta ${stream.port}`);

        // const ffmpeg = spawn('ffmpeg', [
        //     '-rtsp_transport', 'tcp',
        //     '-i', stream.url,
        //     '-f', 'mpegts',
        //     '-codec:v', 'mpeg1video',  
        //     '-s', '3840x2160',         
        //     '-b:v', '150000k',          
        //     '-r', '30',                
        //     '-bf', '0',
        //     '-codec:a', 'mp2',         
        //     '-ar', '48000',            
        //     '-ac', '2',                
        //     '-b:a', '320k',            
        //     '-f', 'mpegts',
        //     'pipe:1'
        // ]);

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

        // Enviando os dados convertidos para o WebSocket
        ffmpeg.stdout.on('data', (data) => {
            dataSent += data.length;
            console.log("Enviando dados para o WebSocket:", data.length);
            socket.send(data, { binary: true });
        });

        // Tratamento de erro
        ffmpeg.stderr.on('data', (data) => {
            console.error(`ffmpeg stderr: ${data}`);
        });

        ffmpeg.on('error', (error) => {
            console.error(`FFmpeg process error: ${error.message}`);
        });

        ffmpeg.on('exit', (code, signal) => {
            console.log(`FFmpeg process exited with code ${code} and signal ${signal}`);
        });

        // Log periódicos da conexão
        const logInterval = setInterval(() => {
            const elapsedTime = (Date.now() - startTime) / 1000;
            console.log(`Conexão WebSocket está aberta há ${elapsedTime} segundos`);
            console.log(`Dados enviados: ${(dataSent / (1024 * 1024)).toFixed(2)} MB`);
            console.log(`Estado do WebSocket: ${socket.readyState}`);
        }, 10000); // Log a cada 10 segundos

        // Finalizando o processo do FFmpeg quando a conexão WebSocket é fechada
        socket.on('close', () => {
            console.log("Cliente desconectado do WebSocket");
            ffmpeg.kill('SIGINT');
            clearInterval(logInterval);
        });

        socket.on('error', (err) => {
            console.error('WebSocket error: ', err);
        });
    });
});
