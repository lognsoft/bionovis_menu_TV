import express from 'express';
import cameraRoutes from '../Routes/cameraRoutes'; // Importando o router de câmeras
import { WebsocketRun } from './WebSocketConnection';

const PORT = 3000;

export function ServerConnection() {

    const app = express();

    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });

    app.use(express.json());
    app.use(cameraRoutes); // Usando as rotas de câmeras

    app.listen(PORT, () => {
        WebsocketRun();
        console.log(`Servidor Express ouvindo na porta ${PORT}`);
    });

    app.on('error', (err) => {
        console.error('Erro ao iniciar o servidor:', err);
    });
}

export default ServerConnection;
