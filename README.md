# Menu Bionovis

Este projeto é um projeto desktop, o funcionamento é 100% local.

### Tecnologias usadas: 
  - Next
  - Elektron
  - Node 

## Como instalar e inicializar.

[Documentação](https://github.com/lognsoft/bionovis_menu_TV/blob/Dev_2.0/documentation/README_INSTALL.md)

## Funcionalidades.

### Câmeras ao vivo.
As câmeras de monitoramento interno só funcionarão se o programa estiver rodando dentro da mesma rede.

[Documentação](https://github.com/lognsoft/bionovis_menu_TV/blob/Dev_2.0/documentation/README_LIVE_CAMERA.md)

---

### Reprodução de arquivos e vídeos.
Existem sessões onde são reproduzidos vídeos, como gravações de câmeras ou apresentações. Existe um limite de formatos que podem ser reproduzidos.

[Documentação](https://github.com/lognsoft/bionovis_menu_TV/blob/Dev_2.0/documentation/README_SUPPORTED_FORMATS.md)

**Configuração necessária:**  
Para que a reprodução de câmeras funcione corretamente, é preciso configurar a variável de ambiente que aponta para o arquivo `ffmpeg.exe`.

[Guia de configuração](https://github.com/lognsoft/bionovis_menu_TV/blob/Dev_2.0/documentation/ENV_SETUP_CAMERA_PLAYBACK.md)

---

### Integração com SharePoint/OneDrive.
O menu tem a capacidade de ler arquivos de diretórios; ou seja, é possível se conectar ao SharePoint/OneDrive, caso o SharePoint/OneDrive esteja sincronizado na máquina.

[Documentação](https://github.com/lognsoft/bionovis_menu_TV/blob/Dev_2.0/documentation/README_SHAREPOINT_ONEDRIVE.md)

---

### Build.
Como efetuar o build do projeto.

[Documentação](https://github.com/lognsoft/bionovis_menu_TV/blob/Dev_2.0/documentation/README_BUILD.md)

---

### Como criar o instalador.
Este menu é uma ferramenta para desktop; portanto, é necessário criar um instalador para torná-lo mais elegante. Para isso, utilizamos o Inno Setup.

[Documentação](https://github.com/lognsoft/bionovis_menu_TV/blob/Dev_2.0/documentation/README_CREATE_INSTALLER.md)

---

### APIs.
Mesmo sendo uma aplicação desktop, dispomos de um backend e APIs para comunicação.

[Documentação](https://github.com/lognsoft/bionovis_menu_TV/blob/Dev_2.0/documentation/README_APIS.md)
