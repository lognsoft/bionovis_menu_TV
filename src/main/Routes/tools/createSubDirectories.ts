import fsAsync from 'fs/promises';
import path from 'path';
import { getRootDirectoryFisicalPath } from './managerRootDirectorie';

//Responsavel por criar os diretorios EN,PT e seus subdiretorios a partir do directoriesConfig.json
export async function CreateDirectories(){
    await createMainDirectories();
    await createSubDirectories();
}

async function createMainDirectories() {
    const directoryPath = await getRootDirectoryFisicalPath();
    const enDirectoryPath = path.join(directoryPath, "EN");
    const ptDirectoryPath = path.join(directoryPath, "PT");
    const paths = [enDirectoryPath, ptDirectoryPath];

    for (const currentPath of paths) {
        try {
            await fsAsync.access(currentPath);
            console.log(`O diretório ${currentPath} já existe.`);
        } catch (error) {
            await fsAsync.mkdir(currentPath);
            console.log(`Diretório ${currentPath} criado com sucesso.`);
        }
    }
}

async function createSubDirectories() {
    const directoryFisicalPath = path.join(__dirname, '..', '..', 'directoriesConfig.json');
    const directoryPath = await getRootDirectoryFisicalPath();
    
    const [directoriesEN, directoriesPT] = await Promise.all([
        readDirectoryConfig(directoryFisicalPath, 'directoriesEN'),
        readDirectoryConfig(directoryFisicalPath, 'directoriesPT')
    ]);
    
    await createLanguageSpecificDirectories(directoryPath, "EN", directoriesEN);
    await createLanguageSpecificDirectories(directoryPath, "PT", directoriesPT);
}

async function readDirectoryConfig(filePath, key) {
    const fileContent = await fsAsync.readFile(filePath, 'utf8');
    const config = JSON.parse(fileContent);
    return config[key];
}

async function createLanguageSpecificDirectories(basePath, language, directories) {
    const baseLangPath = path.join(basePath, language);
    directories.forEach(async subdir => {
        const subdirPath = path.join(baseLangPath, subdir);
        try {
            await fsAsync.access(subdirPath);
        } catch (error) {
            await fsAsync.mkdir(subdirPath);
            console.log(`Subdiretório ${subdirPath} criado com sucesso.`);
        }
    });
}