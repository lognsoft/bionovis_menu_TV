# Funcionamento de Câmeras Ao Vivo

## Configuração Necessária
É crucial que o arquivo `ffmpeg.exe` esteja incluído nas variáveis de ambiente do sistema operacional. Isso permite que as câmeras ao vivo sejam reproduzidas através do protocolo RTSP.

## Dependências
A aplicação não possui dependências online, operando 100% localmente.

## Comandos para Deploy
\```bash
yarn dev   # Inicia o projeto em modo de desenvolvimento.
yarn build # Cria um build do projeto para produção.
\```

## Comunicação FrontEnd e BackEnd
O FrontEnd se comunica com o BackEnd exclusivamente através das seguintes rotas:
- `/configureDirectoriesPath` - Atualiza ou cria diretório raize e pastas internas. EX: - http://localhost:3000/configureDirectoriesPath
- `/camerasRecords` - Lista vídeos. - EX: - http://localhost:3000/camerasRecords?optionMenu=PT/Preparos
- `/startRecord` - Serve ou reproduz vídeo individualmente. EX: - http://localhost:3000/startRecord?DirName=Downstream&optionMenu=PT&ImageName=teste1.mp4
- `/openImage` - Serve ou reproduz imagem individualmente. EX: - http://localhost:3000/openImage?DirName=Downstream&optionMenu=PT&ImageName=teste1.jpg
- `/presentations` - Lista conteúdos diversos. EX: - http://localhost:3000/presentations?optionMenu=EN/Presentations 
- `/checkDirectoriesIfNotExist` - Verifica diretórios, caso algum diretório não exista, será criado automaticamente, essa rota só funciona caso o caminho do diretório raiz esteja referenciado no directoriesConfig.json, caso não exista, será retornado 404. EX: - http://localhost:3000/checkDirectoriesIfNotExist

## Criação de Instalador
Utilizamos o Inno Installer para a criação do instalador. É essencial configurar o `ffmpeg.exe` no Inno Installer como uma variável de ambiente durante a instalação. Isso adiciona a raiz do projeto Bionovis nas variáveis de ambiente do sistema operacional. No diretório raiz do projeto, existe um arquivo chamado `innoInstaller.ino`, que contém exemplos de como gerar o instalador corretamente.

### Exemplo de Configuração no Inno Installer
\```
[Registry]
Root: HKLM; Subkey: "SYSTEM\CurrentControlSet\Control\Session Manager\Environment"; ValueType: string; ValueName: "Bionovis"; ValueData: "{app}"; Flags: preservestringtype uninsdeletevalue
\```
O último registro adiciona a variável de ambiente `Bionovis`.

## Formatos Suportados

### Apresentações
- **Imagens**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.svg`, `.webp`
- **Documentos**: `.pdf`
- **Vídeos**: `.mp4`, `.webm`, `.ogg`

### Câmeras Gravadas
- **Vídeos**: `.mp4`, `.webm`, `.ogg`
- **Capa do vídeo**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.svg`, `.webp`
