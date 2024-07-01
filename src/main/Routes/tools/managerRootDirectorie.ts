import fs from 'fs/promises';
import path from 'path';

// Caminho para o arquivo de configuração
const directoryFisicalPath = path.join(__dirname, '..', '..', 'directoriesConfig.json');

// Retorna o caminho do diretório físico
export async function getRootDirectoryFisicalPath() {
    try {
        // Caminho para o arquivo de configuração
        
        const data = await fs.readFile(directoryFisicalPath, 'utf8');

        const config = JSON.parse(data);
        
        return config.directoryFisicalPath;//Diretório raiz.;

    } catch (err) {
        console.error('Erro ao acessar o caminho do diretório:', err);
        throw err;
    }
}

 export async function updateDirectoryFisicalPath(newDirectory) {
    try {

        // Lendo o arquivo existente
        const data = await fs.readFile(directoryFisicalPath, 'utf8');
        const config = JSON.parse(data);
        
        // Atualizando o diretório no objeto de configuração
        config.directoryFisicalPath = newDirectory;
        
        // Escrevendo as mudanças de volta no arquivo JSON
        await fs.writeFile(directoryFisicalPath, JSON.stringify(config, null, 2), 'utf8');
        
        console.log('Diretório atualizado com sucesso!');
    } catch (err) {
        console.error('Erro ao atualizar o caminho do diretório:', err);
        throw err;
    }
}