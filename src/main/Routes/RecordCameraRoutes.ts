import express from 'express';
import fs from 'fs';
import path from 'path';
import { CameraRecordjsonVideoAndImagesJsonPrepare } from '../Routes/tools/jsonVideoAndImagesPrepare';
import { getRootDirectoryFisicalPath } from './tools/managerRootDirectorie';
// import { updateDirectoryFisicalPath } from './tools/managerRootDirectorie';
// import { CreateDirectories } from './tools/createSubDirectories';

const app = express.Router();

// Rota para listar vídeos
app.get('/camerasRecords', async (req, res) => {

    const rootDirectoryPath = await getRootDirectoryFisicalPath();
    const directory = req.query.optionMenu;    
    const pathDir = path.join(rootDirectoryPath, directory);

    console.log(pathDir);

    fs.readdir(pathDir, (err, files) => {
        if (err) {
            console.error("Falha em ler o diretório ", err);
            return res.status(500).send('Erro durante a leitura do vídeo ou imagem.');
        }

        const objArray = CameraRecordjsonVideoAndImagesJsonPrepare(files, pathDir);

        res.json(objArray);
    });
});

// Rota para servir vídeos individualmente
app.get('/startRecord', async (req, res) => {
    
    const directoryPath = await getRootDirectoryFisicalPath();
    const { VideoName, optionMenu, DirName} = req.query

    console.log(directoryPath);

    const videoPath = path.join(directoryPath,optionMenu,DirName,VideoName);
    console.log(videoPath);

    if (fs.existsSync(videoPath)) {
        console.log("deu certo");
        res.sendFile(videoPath);
    } else {
        res.status(404).send('Video not found');
    }
});

// Rota para servir imagem individualmente
app.get('/openImage', async (req, res) => {
    const directoryPath = await getRootDirectoryFisicalPath();
    const { ImageName, optionMenu, DirName } = req.query;
    
    const imagePath = path.join(directoryPath, optionMenu, DirName, ImageName);

    if (fs.existsSync(imagePath)) {
        console.log("Imagem encontrada");
        res.sendFile(imagePath);
    } else {
        res.status(404).send('Imagem não encontrada');
    }
});

export default app;
