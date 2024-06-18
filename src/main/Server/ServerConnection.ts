import http from 'http';
import { GetAllCamsRoute } from './CamsRoute';

const PORT = 3000;
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Credentials': true
};

const setResponseHeaders = (res) => {
    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
        res.setHeader(key, value);
    });
};

const sendJsonResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

// Criando o servidor HTTP
export function ServerConnection() {
    
    const camRoutes = GetAllCamsRoute();

    const server = http.createServer((req, res) => {
        
        setResponseHeaders(res);

        if(req.url == null) return;

        if (camRoutes[req.url]) {
            const ports = camRoutes[req.url].map(stream => ({
                port: stream.port,
                reference: stream.reference,
                image: stream.image
            }));
            sendJsonResponse(res, 200, ports);
        } else {
            sendJsonResponse(res, 404, 'Not Found');
        }
    });

    server.listen(PORT, () => {
        console.log(`Servidor HTTP ouvindo na porta ${PORT}`);
    });

    server.on('error', (err) => {
        console.error('Erro ao iniciar o servidor:', err);
    });
}

export default ServerConnection;
