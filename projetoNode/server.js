const express = require('express');
const path = require('path');
const { spawn } = require('child_process');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/fechar-office', (req, res) => {

  const exePath = path.join(__dirname, 'exe/CloseOffice.exe');

  const processo = spawn(exePath, [], {
    windowsHide: true
  });

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
        message: `closeOffice.exe finalizou com codigo ${code}.`,
        stderr: stderrData.trim()
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
