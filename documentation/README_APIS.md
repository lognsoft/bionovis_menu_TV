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