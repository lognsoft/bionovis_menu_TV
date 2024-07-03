import express from 'express';
import { updateDirectoryFisicalPath } from './tools/managerRootDirectorie';
import { CreateDirectories } from './tools/createSubDirectories';
import path from 'path';
import { getRootDirectoryFisicalPath } from './tools/managerRootDirectorie';
import fsAsync from 'fs/promises';

const app = express.Router();

//Rota para atualizar/criar diretório raiz.
app.post('/configureDirectoriesPath', async (req, res) => {
    try {
        const newDirectoryPath = req.body.newDirectory;//Diretorio de arquivos selecionado pelo cliente.
        console.log(newDirectoryPath);
        if (!newDirectoryPath) {
            return res.status(400).json({ message: 'O novo caminho do diretório é necessário.' });
        }

        // Atualiza o diretório raiz no arquivo de configuração
        await updateDirectoryFisicalPath(newDirectoryPath);

        //Cria todos os subdiretorios dentro da pasta raiz.
        await CreateDirectories();

        return res.status(200).json({ message: 'Caminho do diretório atualizado com sucesso!' });
    } catch (err) {
        console.error('Erro ao atualizar o caminho do diretório:', err);
        return res.status(500).json({ message: 'Erro ao atualizar o caminho do diretório.' });
    }
});


// Rota para verificar se os diretórios existem e criar os que estiverem faltando
app.get('/checkDirectoriesIfNotExist', async (req,res) => {
    try {
        const directoryFisicalPath = path.join(__dirname, '..', '..', 'directoriesConfig.json');
        const rootDirectoryPath = await getRootDirectoryFisicalPath();
        const data:string = await fsAsync.readFile(directoryFisicalPath, 'utf8');
        const datajson:{directoryFisicalPath:string | null, directoriesEN:string[], directories:string[] } = JSON.parse(data);
        
        console.log(rootDirectoryPath);

        

        if (datajson.directoryFisicalPath != null) {
            await CreateDirectories();
            return res.json({ path: rootDirectoryPath });
        } else {
            return res.sendStatus(404);
        }
    } catch (error) {
        console.error('Erro ao verificar os diretórios:', error);
        return res.status(500).send('Erro interno do servidor');
    }
});

export default app;
