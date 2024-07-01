import express from 'express';
import fs from 'fs';
import path from 'path';
import { ApresentationJsonVideoAndImagesJsonPrepare } from './tools/jsonVideoAndImagesPrepare';
import { getRootDirectoryFisicalPath } from './tools/managerRootDirectorie';

const app = express.Router();

// Rota para listar apresentações
app.get('/presentations', async (req, res) => {

    const rootDirectoryPath = await getRootDirectoryFisicalPath();
    const directory = req.query.optionMenu; 
    const pathDir = path.join(rootDirectoryPath, directory);

    console.log(pathDir);


    fs.readdir(pathDir, (err, files) => {
        if (err) {
            console.error("Falha em ler o diretório ", err);
            return res.status(500).send('Erro durante a leitura do vídeo ou imagem.');
        }

        let objArray = ApresentationJsonVideoAndImagesJsonPrepare(files, pathDir);

        res.json(objArray);
    });
});

export default app;