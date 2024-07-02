import express from 'express';
import { updateDirectoryFisicalPath } from './tools/managerRootDirectorie';
import { CreateDirectories } from './tools/createSubDirectories';

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

export default app;
