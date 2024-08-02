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