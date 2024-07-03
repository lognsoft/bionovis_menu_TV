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

## API Disponíveis

### 1. Configuração de Diretórios
- **Endpoint:** `/configureDirectoriesPath`
- **Descrição:** Atualiza ou cria o diretório raiz e pastas internas.
- **Exemplo de chamada:** `http://localhost:3000/configureDirectoriesPath`

### 2. Registros de Câmeras
- **Endpoint:** `/camerasRecords`
- **Descrição:** Lista vídeos disponíveis.
- **Suporta Formatos Vídeos:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.svg`, `.webp`, `.mp4`, `.webm`, `.ogg`
- **Suporta Formatos Capa:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.svg`, `.webp`
- **Exemplo de chamada:** `http://localhost:3000/camerasRecords?optionMenu=PT/Preparos`

### 3. Reprodução de Vídeo
- **Endpoint:** `/startRecord`
- **Descrição:** Serve ou reproduz um vídeo individualmente.
- **Exemplo de chamada:** `http://localhost:3000/startRecord?DirName=Downstream&optionMenu=PT&ImageName=teste1.mp4`

### 4. Visualização de Imagem
- **Endpoint:** `/openImage`
- **Descrição:** Serve ou reproduz uma imagem individualmente.
- **Exemplo de chamada:** `http://localhost:3000/openImage?DirName=Downstream&optionMenu=PT&ImageName=teste1.jpg`

### 5. Apresentações e Documentos
- **Endpoint:** `/presentations`
- **Descrição:** Lista conteúdos diversos, incluindo formatos do pacote Office.
- **Suporta Formatos:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.svg`, `.webp`, `.pdf`, `.pptx`, `.docx`, `.xlsx`
- **Exemplo de chamada:** `http://localhost:3000/presentations?optionMenu=EN/Presentations`

### 6. Verificação de Diretórios
- **Endpoint:** `/checkDirectoriesIfNotExist`
- **Descrição:** Verifica se os diretórios especificados existem; cria automaticamente se não existirem.
- **Exemplo de chamada:** `http://localhost:3000/checkDirectoriesIfNotExist`
- **Observação:** Esta rota só funciona se o caminho do diretório raiz estiver configurado no `directoriesConfig.json`. Se o arquivo não existir, será retornado erro 404.

### Uso
Para interagir com estas rotas, utilize as URLs de exemplo fornecidas, substituindo os parâmetros conforme necessário para atender ao contexto de sua aplicação.


## Guia de Configuração e Geração de Instalador com Inno Setup

### Pré-requisitos
1. **Instalar o Inno Setup**
   - Faça o download do Inno Setup no [site oficial](https://jrsoftware.org/isinfo.php).
   - Siga as instruções de instalação no site.

### Geração do Instalador

1. **Passos para gerar o instalador**
   - Navegue até a raiz do projeto onde o arquivo `innoInstaller` está localizado.
   - Abra o Inno Setup Compiler.
   - Carregue o arquivo de script `innoInstaller` no Inno Setup.

2. **Adicionar a variável de ambiente**
   - É crucial adicionar a seguinte linha ao arquivo de script do Inno Setup para que a variável de ambiente `Bionovis` seja configurada corretamente:
   ```ini
   [Registry]
   Root: HKLM; Subkey: "SYSTEM\CurrentControlSet\Control\Session Manager\Environment"; ValueType: string; ValueName: "Bionovis"; ValueData: "{app}"; Flags: preservestringtype uninsdeletevalue

## Formatos Suportados

### Apresentações
- **Imagens**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.svg`, `.webp`
- **Documentos**: `.pdf`
- **Vídeos**: `.mp4`, `.webm`, `.ogg`

### Câmeras Gravadas
- **Vídeos**: `.mp4`, `.webm`, `.ogg`
- **Capa do vídeo**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.svg`, `.webp`

- ## Vídeos institucionais

### Nome dos arquivos que devem estar no diretório
- **Institucional PT legendado**: `institucional_legendado.mp4`
- **Institucional PT sem legenda**: `institucional.mp4`
- **Institucional EN**: `institutional.mp4`
- **Vídeos**: `.mp4`, `.webm`, `.ogg`

## Processos produtivos

### Nome dos arquivos que devem estar no diretório
- **Processo Produtivo PT**: `processo_produtivo.mp4`
- **Processo Produtivo EN**: `productive_process.mp4`
- **Vídeos**: `.mp4`, `.webm`, `.ogg`

### Câmeras Gravadas
- **Vídeos**: `.mp4`, `.webm`, `.ogg`
- **Capa do vídeo**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.svg`, `.webp`
