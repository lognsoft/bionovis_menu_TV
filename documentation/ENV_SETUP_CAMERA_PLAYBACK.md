# Configuração de Variável de Ambiente para Reprodução de Câmeras

Esta variável permite que o sistema acesse o **FFmpeg** (localizado na raiz do projeto) para reprodução de câmeras.

---

## ⚙️ Passos

1. **Verifique o FFmpeg:**
   Certifique-se de que o arquivo `ffmpeg.exe` está na **raiz do projeto**, por exemplo:  
C:\Users\Bruno\Projetos\Bionovis\ffmpeg.exe

markdown
Copiar código

2. **Abra as Variáveis de Ambiente:**
- No menu Iniciar, procure por **“Editar variáveis de ambiente do sistema”**.
- Clique em **“Variáveis de Ambiente...”**.

3. **Crie uma nova variável de usuário:**
- **Nome da variável:**  
  ```
  Bionovis
  ```
- **Valor da variável:**  
  ```
  C:\Users\Bruno\Projetos\Bionovis\ffmpeg.exe
  ```

4. **Confirme e salve.**

---

## ✅ Teste

No **Prompt de Comando**, execute:

echo %Bionovis%

arduino
Copiar código

O caminho do FFmpeg deve ser exibido.

Depois teste a execução:

"%Bionovis%" -version

yaml
Copiar código

Se o FFmpeg responder, a configuração está correta.

---

**Variável:** `Bionovis`  
**Valor:** caminho completo do `ffmpeg.exe` na raiz do projeto  
**Função:** habilitar reprodução de câmeras via FFmpeg