import express from 'express';
import { GetAllCamsRoute } from '../Server/WebSocketConnection';

const router = express.Router();

router.get('/live-cams/:nameMenu', (req, res) => {
    let camRoutes = GetAllCamsRoute(req.params.nameMenu);

    if (camRoutes) {
        const ports = camRoutes.map(stream => ({
            port: stream.port,
            reference: stream.reference,
            image: stream.image
        }));

        res.status(200).json(ports);
    } else {
        res.status(404).json({ message: 'Not Found' });
    }
});

export default router;
