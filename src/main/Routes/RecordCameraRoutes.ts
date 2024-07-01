import express from 'express';
import fs from 'fs';
import path from 'path';
import { CameraRecordjsonVideoAndImagesJsonPrepare } from '../Routes/tools/jsonVideoAndImagesPrepare';
import { getRootDirectoryFisicalPath } from './tools/managerRootDirectorie';
// import { updateDirectoryFisicalPath } from './tools/managerRootDirectorie';
// import { CreateDirectories } from './tools/createSubDirectories';

const app = express.Router();


//Rota para atualizar/criar diretório raiz.
// app.post('/configureDirectoriesPath', async (req, res) => {
//     try {
//         const newDirectoryPath = req.body.newDirectory;//Diretorio de arquivos selecionado pelo cliente.

//         if (!newDirectoryPath) {
//             return res.status(400).json({ message: 'O novo caminho do diretório é necessário.' });
//         }

//         // Atualiza o diretório raiz no arquivo de configuração
//         await updateDirectoryFisicalPath(newDirectoryPath);

//         //Cria todos os subdiretorios dentro da pasta raiz.
//         await CreateDirectories();

//         res.status(200).json({ message: 'Caminho do diretório atualizado com sucesso!' });
//     } catch (err) {
//         console.error('Erro ao atualizar o caminho do diretório:', err);
//         res.status(500).json({ message: 'Erro ao atualizar o caminho do diretório.' });
//     }
// });

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

// // Rota para listar apresentações
// app.get('/apresentations', async (req, res) => {

//     const rootDirectoryPath = await getRootDirectoryFisicalPath();
//     const directory = req.query.optionMenu; 
//     const pathDir = path.join(rootDirectoryPath, directory);

//     console.log(pathDir);


//     fs.readdir(pathDir, (err, files) => {
//         if (err) {
//             console.error("Falha em ler o diretório ", err);
//             return res.status(500).send('Erro durante a leitura do vídeo ou imagem.');
//         }

//         let objArray = ApresentationJsonVideoAndImagesJsonPrepare(files, pathDir);

//         res.json(objArray);
//     });
// });

// Rota para servir vídeos individualmente
app.get('/startRecord', async (req, res) => {
    
    const directoryPath = await getRootDirectoryFisicalPath();
    const { VideoName, optionMenu, DirName} = req.query

    const videoPath = path.join(directoryPath+"\\"+optionMenu+"\\"+DirName+"\\"+VideoName);
    console.log(videoPath);

    if (fs.existsSync(videoPath)) {
        console.log("deu certo");
        res.sendFile(videoPath);
    } else {
        res.status(404).send('Video not found');
    }
});

// async function CreateDirectories(){
//     await createMainDirectories();
//     await createSubDirectories();
// }

// async function createMainDirectories() {
//     const directoryPath = await getRootDirectoryFisicalPath();
//     const enDirectoryPath = path.join(directoryPath, "EN");
//     const ptDirectoryPath = path.join(directoryPath, "PT");
//     const paths = [enDirectoryPath, ptDirectoryPath];

//     for (const currentPath of paths) {
//         try {
//             await fsAsync.access(currentPath);
//             console.log(`O diretório ${currentPath} já existe.`);
//         } catch (error) {
//             await fsAsync.mkdir(currentPath);
//             console.log(`Diretório ${currentPath} criado com sucesso.`);
//         }
//     }
// }

// async function createSubDirectories() {
//     const directoryFisicalPath = path.join(__dirname, '..', '..', 'directoriesConfig.json');
//     const directoryPath = await getRootDirectoryFisicalPath();
    
//     const [directoriesEN, directoriesPT] = await Promise.all([
//         readDirectoryConfig(directoryFisicalPath, 'directoriesEN'),
//         readDirectoryConfig(directoryFisicalPath, 'directoriesPT')
//     ]);
    
//     await createLanguageSpecificDirectories(directoryPath, "EN", directoriesEN);
//     await createLanguageSpecificDirectories(directoryPath, "PT", directoriesPT);
// }

// async function readDirectoryConfig(filePath, key) {
//     const fileContent = await fsAsync.readFile(filePath, 'utf8');
//     const config = JSON.parse(fileContent);
//     return config[key];
// }

// async function createLanguageSpecificDirectories(basePath, language, directories) {
//     const baseLangPath = path.join(basePath, language);
//     directories.forEach(async subdir => {
//         const subdirPath = path.join(baseLangPath, subdir);
//         try {
//             await fsAsync.access(subdirPath);
//         } catch (error) {
//             await fsAsync.mkdir(subdirPath);
//             console.log(`Subdiretório ${subdirPath} criado com sucesso.`);
//         }
//     });
// }


// async function CreateSubDirectories(){
            
//     const directoryFisicalPath = path.join(__dirname, '..', '..', 'directoriesConfig.json');
//     const directoryPath = await getRootDirectoryFisicalPath();

//     const enDirectoryPath = directoryPath + "\\EN";
//     const ptDirectoryPath = directoryPath + "\\PT";
    
//     const paths = [enDirectoryPath, ptDirectoryPath];

//     //Cria diretorio dos paises
//     for (const path of paths) {
//         try {
//             await fsAsync.access(path);
//             console.log(`O diretório ${path} já existe.`);
//         } catch (error) {
//             // O diretório não existe, então criamos ele
//             await fsAsync.mkdir(path);
//             console.log(`Diretório ${path} criado com sucesso.`);
//         }
//     }

//     const directoriesEN = JSON.parse(await fsAsync.readFile(directoryFisicalPath, 'utf8')).directoriesEN;
//     const directoriesPT = JSON.parse(await fsAsync.readFile(directoryFisicalPath, 'utf8')).directoriesPT;

//     directoriesEN.forEach(subdir => {
//         const subdirPathEN = path.join(directoryPath,"\\EN", subdir);
//         if (!fs.existsSync(subdirPathEN)) {
//             fs.mkdirSync(subdirPathEN);
//         }
//     });

//     directoriesPT.forEach(subdir => {
//         const directoriesPT = path.join(directoryPath,"\\PT", subdir);
//         if (!fs.existsSync(directoriesPT)) {
//             fs.mkdirSync(directoriesPT);
//         }
//     });
// }

export default app;
