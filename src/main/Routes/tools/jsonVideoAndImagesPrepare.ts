/**
 * Função responsável por facilitar o envio de arquivos e diretórios para o front-end.
 * Envia o caminho do vídeo e, se houver uma miniatura (thumb), também envia o caminho da thumb.
 * Caso contrário, envia false.
 */
function CameraRecordjsonVideoAndImagesJsonPrepare(files, directoryFisicalPath) {

    const videoExtensions = ['.mp4', '.webm', '.ogg'];  // Extensões comuns de vídeo
    const imageExtensions = ['.jpg', '.jpeg', '.JPEG', '.png', '.gif', '.bmp', '.svg', '.webp'];  // Extensões comuns de arquivos

    const videos:Array<string> = files.filter(file => videoExtensions.some(ext => file.endsWith(ext)));
    const images:Array<string> = files.filter(file => imageExtensions.some(ext => file.endsWith(ext)));

    const imageNames = new Set(images.map(file => file.split('.')[0]));

    const objArray:ReadonlyArray<{video:string,image:string | boolean}> = videos.reduce((acc, video) => {
        const baseName:string = video.split('.')[0];
        let imageName:string | boolean = imageNames.has(baseName) ? `${directoryFisicalPath}\\${baseName}${imageExtensions.find(ext => images.includes(baseName + ext))}` : false;
        if(typeof imageName === 'string') imageName = imageName.replace(/\\/g,"/");
        const obj:{video:string,image:string | boolean} = {
            video: video,
            image: imageName
        };
        acc.push(obj);
        return acc;
    }, []);

    return objArray;
}


function ApresentationJsonVideoAndImagesJsonPrepare(files: string[], directoryFisicalPath: string): string[] {
    const videoExtensions = ['.mp4', '.webm', '.ogg']; // Extensões comuns de vídeo
    const imageExtensions = ['.jpg', '.jpeg', '.JPEG', '.png', '.gif', '.bmp', '.svg', '.webp', '.pdf','.pptx', '.docx', '.xlsx']; // Extensões comuns de arquivos

    const videos:Array<string> = files.filter(file => videoExtensions.some(ext => file.endsWith(ext)));
    const images:Array<string> = files.filter(file => imageExtensions.some(ext => file.endsWith(ext)));

    const objArray: string[] = [];

    // Adicionando vídeos e imagens ao array
    videos.forEach(element => {
        objArray.push(`${directoryFisicalPath}\\${element}`);
    });

    images.forEach(element => {
        objArray.push(`${directoryFisicalPath}\\${element}`);
    });

    return objArray; // Retorna o array com todos os vídeos e imagens
}


export  { CameraRecordjsonVideoAndImagesJsonPrepare , ApresentationJsonVideoAndImagesJsonPrepare };
