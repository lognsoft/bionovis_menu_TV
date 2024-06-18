const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

//diretorio.
const videosPath = 'D:\\OneDrive\\BionovisDados';
//const videosPath = 'C:\\Users\\lido.rizzi\\Documents\\BIONOVIS S.A. - COMPANHIA BRASILEIRA DE BIOTECNOLOGIA FARMACEUTICA\\Comunicação e Marketing - teste TV'; //

app.use(express.static('public'));

// app.use('/corredor', express.static(videosPath));

// Rota para listar vídeos
app.get('/corredor', (req, res) => {
    fs.readdir(videosPath+"\\Corredor", (err, files) => {
        if (err) {
            console.error("Failed to read directory: ", err);
            return res.status(500).send('Error reading videos directory.');
        }
        res.json(files.filter(file => file.endsWith('.mp4')));
    });
});

// Rota para servir vídeos individualmente
app.get('/corredor/:videoName', (req, res) => {
    const videoPath = path.join(videosPath+"\\Corredor", req.params.videoName);
    if (fs.existsSync(videoPath)) {
        res.sendFile(videoPath);
    } else {
        res.status(404).send('Video not found');
    }
});



// Rota para listar vídeos
app.get('/sala', (req, res) => {
    fs.readdir(videosPath+"\\Sala", (err, files) => {
        if (err) {
            console.error("Failed to read directory: ", err);
            return res.status(500).send('Error reading videos directory.');
        }
        res.json(files.filter(file => file.endsWith('.mp4')));
    });
});

// Rota para servir vídeos individualmente
app.get('/sala/:videoName', (req, res) => {
    const videoPath = path.join(videosPath+"\\Sala", req.params.videoName);
    if (fs.existsSync(videoPath)) {
        res.sendFile(videoPath);
    } else {
        res.status(404).send('Video not found');
    }
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
