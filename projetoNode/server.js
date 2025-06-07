// projetoNode/server.js
const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = 3000;

// Serve arquivos estáticos (public/index.html, CSS, JS, etc)
app.use(express.static(path.join(__dirname, 'public')));

// POST /fechar-office
app.post('/fechar-office', (req, res) => {
  const exePath = path.join(__dirname, 'exe', 'CloseOffice.exe');
  const processo = spawn(exePath, [], { windowsHide: true });

  let stdoutData = '';
  let stderrData = '';

  processo.stdout.on('data', (data) => {
    stdoutData += data.toString();
  });

  processo.stderr.on('data', (data) => {
    stderrData += data.toString();
  });

  processo.on('error', (err) => {
    console.error('Erro ao iniciar o CloseOffice.exe:', err);
    return res.status(500).json({ success: false, error: err.message });
  });

  processo.on('close', (code) => {
    if (code === 0) {
      res.json({ success: true, message: stdoutData.trim() });
    } else {
      res.status(500).json({
        success: false,
        message: `CloseOffice.exe finalizou com código ${code}.`,
        stderr: stderrData.trim()
      });
    }
  });
});

// POST /abrir-ppt
app.post('/abrir-ppt', (req, res) => {
  // Ajuste o caminho se necessário, aqui assumimos:
  // projetoNode      <- __dirname
  // └─ ../documentos/Apresentação1.pptx
  const pptPath = path.join(__dirname, '..', 'documentos', 'Apresentação1.pptx');

  // No Windows, 'cmd /c start "" <arquivo>' abre o .pptx com o app padrão
  const processo = spawn('cmd', ['/c', 'start', '""', pptPath], { windowsHide: true });

  let stderrData = '';

  processo.stderr.on('data', (data) => {
    stderrData += data.toString();
  });

  processo.on('error', (err) => {
    console.error('Erro ao executar start para PowerPoint:', err);
    return res.status(500).json({ success: false, error: err.message });
  });

  processo.on('close', (code) => {
    if (code === 0) {
      res.json({ success: true, message: `PowerPoint aberto com sucesso (exit code ${code})` });
    } else {
      res.status(500).json({
        success: false,
        message: `Erro ao abrir PowerPoint (code ${code}).`,
        stderr: stderrData.trim()
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
