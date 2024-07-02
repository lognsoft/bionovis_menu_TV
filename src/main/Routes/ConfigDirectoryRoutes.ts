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

        res.status(200).json({ message: 'Caminho do diretório atualizado com sucesso!' });
    } catch (err) {
        console.error('Erro ao atualizar o caminho do diretório:', err);
        res.status(500).json({ message: 'Erro ao atualizar o caminho do diretório.' });
    }
});


// Rota para verificar se os diretórios existem e criar os que estiverem faltando
app.get('/checkDirectoriesIfNotExist', async (req, res) => {
    try {
        const directoryFisicalPath = path.join(__dirname, '..', '..', 'directoriesConfig.json');
        const rootDirectoryPath = await getRootDirectoryFisicalPath();
        let data = await fsAsync.readFile(directoryFisicalPath, 'utf8');
        data = JSON.parse(data);
        
        console.log(rootDirectoryPath);

        

        if (data.directoryFisicalPath != null) {
            await CreateDirectories();
            res.send(rootDirectoryPath);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error('Erro ao verificar os diretórios:', error);
        res.status(500).send('Erro interno do servidor');
    }
});

export default app;
