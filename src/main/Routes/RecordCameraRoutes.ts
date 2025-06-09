import express from 'express';
import fs from 'fs';
import path from 'path';
import { CameraRecordjsonVideoAndImagesJsonPrepare } from '../Routes/tools/jsonVideoAndImagesPrepare';
import { getRootDirectoryFisicalPath } from './tools/managerRootDirectorie';
import { spawn } from 'child_process';
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

// Rota para servir imagem individualmente
app.get('/openDocument', async (req, res) => {
    const directoryPath = await getRootDirectoryFisicalPath();
    const { DocName, optionMenu, DirName } = req.query;
    
    const DocPath = path.join(directoryPath, optionMenu, DirName, DocName);

    if (fs.existsSync(DocPath)) {
        console.log("Documento encontrado");
        res.sendFile(DocPath);
    } else {
        res.status(404).send('Documento não encontrado');
    }
});

app.post('/fechar-office', (_req, res) => {
  const exePath = path.join(__dirname, '../..', 'assets', 'exe', 'CloseOffice.exe');
  console.log(exePath)
  const processo = spawn(exePath, [], { windowsHide: true });

  let stdoutData = '';
  let stderrData = '';

  processo.stdout.on('data', (data) => {
    stdoutData += data.toString();
  });

  processo.stderr.on('data', (data) => {
    stderrData += data.toString();
  });

  processo.on('error', (err) => {
    console.error('Erro ao iniciar o CloseOffice.exe:', err);
    return res.status(500).json({ success: false, error: err.message });
  });

  processo.on('close', (code) => {
    if (code === 0) {
      res.json({ success: true, message: stdoutData.trim() });
    } else {
      res.status(500).json({
        success: false,
        message: `CloseOffice.exe finalizou com código ${code}.`,
        stderr: stderrData.trim()
      });
    }
  });
});

// app.post('/abrir-ppt', (req, res) => {

//   const pptPath = path.join(__dirname, '..', 'documentos', 'Apresentação1.pptx');

//   const processo = spawn('cmd', ['/c', 'start', '""', pptPath], { windowsHide: true });

//   let stderrData = '';

//   processo.stderr.on('data', (data) => {
//     stderrData += data.toString();
//   });

//   processo.on('error', (err) => {
//     console.error('Erro ao executar start para PowerPoint:', err);
//     return res.status(500).json({ success: false, error: err.message });
//   });

//   processo.on('close', (code) => {
//     if (code === 0) {
//       res.json({ success: true, message: `PowerPoint aberto com sucesso (exit code ${code})` });
//     } else {
//       res.status(500).json({
//         success: false,
//         message: `Erro ao abrir PowerPoint (code ${code}).`,
//         stderr: stderrData.trim()
//       });
//     }
//   });
// });



export default app;
