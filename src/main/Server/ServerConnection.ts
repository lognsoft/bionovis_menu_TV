import express from 'express';
import liveCameraRoutes from '../Routes/LiveCameraRoutes'; // Importando o router de câmeras
import recordCameraRoutes from '../Routes/RecordCameraRoutes'; // Importando o router de câmeras
import aprensentationRoutes from '../Routes/PresentationRoutes'; // Importando o router de apresentações
import configDirectoryRoutes from '../Routes/configDirectoryRoutes'; // Importando o router de apresentações
import { WebsocketRun } from './WebSocketConnection';

const PORT = 3000;

export function ServerConnection() {

    const app = express();

    app.use((_req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        res.header('Access-Control-Allow-Credentials', true);
        next();
    });      

    app.use(express.json());
    app.use(liveCameraRoutes); //Usando as rotas de câmeras
    app.use(recordCameraRoutes); //Rotas de cameras gravadas
    app.use(aprensentationRoutes); //Rotas de apresentações.
    app.use(configDirectoryRoutes); //Rota de configuração do diretorio raiz.

    app.listen(PORT, () => {
        WebsocketRun();
        console.log(`Servidor Express ouvindo na porta ${PORT}`);
    });

    app.on('error', (err) => {
        console.error('Erro ao iniciar o servidor:', err);
    });
}

export default ServerConnection;
