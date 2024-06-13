const { app, shell, BrowserWindow, ipcMain, globalShortcut } = require('electron');
const { join, resolve } = require('path');
const { electronApp, optimizer, is } = require('@electron-toolkit/utils');
const websocket = require('ws');
const { spawn } = require('child_process');
const http = require('http');

// Corrige o caminho do ícone para garantir que seja carregado corretamente
const iconPath = resolve(__dirname, '../../resources/icon.png');

function createWindow() {
  const mainWindow = new BrowserWindow({
    title: "Bionovis",
    minWidth: 1200,
    minHeight: 768,
    fullscreen: true, // Alterado para false para não iniciar em tela cheia
    resizable: false, // Impede redimensionamento
    frame: false, // Remove a barra de título padrão
    show: false,
    autoHideMenuBar: true,
    icon: iconPath,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: false,
    }
  });

  // Eventos de atalhos globais, desativando F11 e outros
  app.whenReady().then(() => {
    globalShortcut.register('F11', () => {}); // Desativa F11
    globalShortcut.register('Alt+F4', () => {}); // Desativa Alt+F4 se necessário
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  ipcMain.on("close-app", () => {
    app.quit();
  });
  
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

//servidor bionovis
function startServer() {
  // const streams = [
  //   { url: 'rtsp://admin:bruno123@192.168.2.233:554/cam/realmonitor?channel=1&subtype=0', port: 8082 },
  //   { url: 'rtsp://admin:bruno123@192.168.2.233:554/cam/realmonitor?channel=1&subtype=0', port: 8083 },
  // ];
  type Stream = {
    reference: { default:string, english:string },
    url: string,
    port: number,
  };
  const streamsPreparations:ReadonlyArray<Stream> = [
    {
      reference:{
        default:"Teste Cam",
        english:"Test Cam"
      },
      url: 'rtsp://admin:bruno123@192.168.2.233:554/cam/realmonitor?channel=1&subtype=0',
      port: 4000
    },
    {
        reference: {
            default: "PRODUÇÃO | PREPARO DE MEIO MPOA",
            english: "PRODUCTION | MPOA MEDIUM PREPARATION"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.27:554/cam/realmonitor?channel=1&subtype=0',
        port: 8091
    },
    {
        reference: {
            default: "PRODUÇÃO | PREPARO DE SOLUÇÕES",
            english: "PRODUCTION | SOLUTIONS PREPARATION"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.20:554/cam/realmonitor?channel=1&subtype=0',
        port: 8092
    },
    {
        reference: {
            default: "PRODUÇÃO | LAVAGEM",
            english: "PRODUCTION | WASHING"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.43:554/cam/realmonitor?channel=1&subtype=0',
        port: 8093
    },
    {
        reference: {
            default: "PRODUÇÃO | MONTAGEM",
            english: "PRODUCTION | ASSEMBLY"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.30:554/cam/realmonitor?channel=1&subtype=0',
        port: 8094
    },
    {
        reference: {
            default: "PRODUÇÃO | LAVAGEM",
            english: "PRODUCTION | WASHING"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.51:554/cam/realmonitor?channel=1&subtype=0',
        port: 8095
    },
    {
        reference: {
            default: "PRODUÇÃO | MONTAGEM",
            english: "PRODUCTION | ASSEMBLY"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.50:554/cam/realmonitor?channel=1&subtype=0',
        port: 8096
    }
  ];
  const streamsUpstreams:ReadonlyArray<Stream> = [
    {
        reference: {
            default: "PRODUÇÃO | BANCO DE CÉLULAS",
            english: "PRODUCTION | CELL BANK"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.56:554/cam/realmonitor?channel=1&subtype=0',
        port: 8085
    },
    {
        reference: {
            default: "PRODUÇÃO | INOCULAÇÃO",
            english: "PRODUCTION | INOCULATION"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.54:554/cam/realmonitor?channel=1&subtype=0',
        port: 8086
    },
    {
        reference: {
            default: "PRODUÇÃO | CULTURA CELULAR",
            english: "PRODUCTION | CELL CULTURE"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.26:554/cam/realmonitor?channel=1&subtype=0',
        port: 8087
    }
  ];
  const streamsDownStreams:ReadonlyArray<Stream> = [
    {
        reference: {
            default: "PRODUÇÃO | RECUPERAÇÃO PRIMÁRIA",
            english: "PRODUCTION | PRIMARY RECOVERY"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.17:554/cam/realmonitor?channel=1&subtype=0',
        port: 8088
    },
    {
        reference: {
            default: "PRODUÇÃO | PURIFICAÇÃO",
            english: "PRODUCTION | PURIFICATION"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.18:554/cam/realmonitor?channel=1&subtype=0',
        port: 8089
    },
    {
        reference: {
            default: "PRODUÇÃO | PURIFICAÇÃO FINAL",
            english: "PRODUCTION | FINAL PURIFICATION"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.34:554/cam/realmonitor?channel=1&subtype=0',
        port: 8090
    }
  ];
  const streamsAreaPassagem:ReadonlyArray<Stream> = [
    {
        reference: {
            default: "PRODUÇÃO | CORREDOR SALAS DE REUNIÕES",
            english: "PRODUCTION | MEETING ROOMS HALLWAY"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.10:554/cam/realmonitor?channel=1&subtype=0',
        port: 8097
    },
    {
        reference: {
            default: "PRODUÇÃO | CORREDOR DISTRIBUIÇÃO",
            english: "PRODUCTION | DISTRIBUTION HALLWAY"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.11:554/cam/realmonitor?channel=1&subtype=0',
        port: 8098
    },
    { 
        reference: {
            default: "PRODUÇÃO | CORREDOR DE DISTRIBUIÇÃO",
            english: "PRODUCTION | DISTRIBUTION HALLWAY"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.25:554/cam/realmonitor?channel=1&subtype=0',
        port: 8099
    },
    {
        reference: {
            default: "PRODUÇÃO | CORREDOR DE RETORNO",
            english: "PRODUCTION | RETURN HALLWAY"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.19:554/cam/realmonitor?channel=1&subtype=0',
        port: 8100
    }
  ];
  const streamsFillAndFinish:ReadonlyArray<Stream> = [
    {
        reference: {
            default: "FORMULAÇÃO E ENVASE | LAVAGEM",
            english: "FORMULATION AND FILLING | WASHING"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.36:554/cam/realmonitor?channel=1&subtype=0',
        port: 8101
    },
    {
        reference: {
            default: "FORMULAÇÃO E ENVASE | MONTAGEM",
            english: "FORMULATION AND FILLING | ASSEMBLY"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.21:554/cam/realmonitor?channel=1&subtype=0',
        port: 8102
    },
    {
        reference: {
            default: "FORMULAÇÃO E ENVASE | FORMULAÇÃO",
            english: "FORMULATION AND FILLING | FORMULATION"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.15:554/cam/realmonitor?channel=1&subtype=0',
        port: 8103
    },
    {
        reference: {
            default: "FORMULAÇÃO E ENVASE | ENVASE ASSÉPTICO",
            english: "FORMULATION AND FILLING | ASEPTIC FILLING"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.39:554/cam/realmonitor?channel=1&subtype=0',
        port: 8104
    },
    {
        reference: {
            default: "FORMULAÇÃO E ENVASE | ENVASE ASSÉPTICO",
            english: "FORMULATION AND FILLING | ASEPTIC FILLING"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.40:554/cam/realmonitor?channel=1&subtype=0',
        port: 8105
    }
  ];
  const streamsEmbalagemSecundaria:ReadonlyArray<Stream> = [
    {
        reference: {
            default: "EMBALAGEM SECUNDÁRIA | BAIA 02 (FUTURA)",
            english: "SECONDARY PACKAGING | BAY 02 (FUTURE)"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.7:554/cam/realmonitor?channel=1&subtype=0',
        port: 8106
    },
    {
        reference: {
            default: "EMBALAGEM SECUNDÁRIA | BAIA 02 (FUTURA)",
            english: "SECONDARY PACKAGING | BAY 02 (FUTURE)"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.42:554/cam/realmonitor?channel=1&subtype=0',
        port: 8107
    },
    {
        reference: {
            default: "EMBALAGEM SECUNDÁRIA | BAIA 01",
            english: "SECONDARY PACKAGING | BAY 01"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.41:554/cam/realmonitor?channel=1&subtype=0',
        port: 8108
    },
    {
        reference: {
            default: "EMBALAGEM SECUNDÁRIA | BAIA 01",
            english: "SECONDARY PACKAGING | BAY 01"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.6:554/cam/realmonitor?channel=1&subtype=0',
        port: 8109
    }
  ];
  const streamsLogistica:ReadonlyArray<Stream> = [
    {
        reference: {
            default: "LOGÍSTICA | CÂMARA FRIA",
            english: "LOGISTICS | COLD CHAMBER"
        },
        url: 'rtsp://tv:Bionovis2024tv@172.16.0.127:554/cam/realmonitor?channel=1&subtype=0',
        port: 8110
    },
    {
        reference: {
            default: "LOGÍSTICA | CÂMARA FRIA",
            english: "LOGISTICS | COLD CHAMBER"
        },
        url: 'rtsp://tv:Bionovis2024tv@172.16.0.124:554/cam/realmonitor?channel=1&subtype=0',
        port: 8111
    },
    {
        reference: {
            default: "LOGÍSTICA | DOCA FRIA",
            english: "LOGISTICS | COLD DOCK"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.123:554/cam/realmonitor?channel=1&subtype=0',
        port: 8112
    },
    {
        reference: {
            default: "LOGÍSTICA | DOCA FRIA",
            english: "LOGISTICS | COLD DOCK"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.118:554/cam/realmonitor?channel=1&subtype=0',
        port: 8113
    },
    {
        reference: {
            default: "LOGÍSTICA | INVÓLUCRO",
            english: "LOGISTICS | WRAPPING"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.122:554/cam/realmonitor?channel=1&subtype=0',
        port: 8114
    },
    {
        reference: {
            default: "LOGÍSTICA | ESCRITÓRIO",
            english: "LOGISTICS | OFFICE"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.129:554/cam/realmonitor?channel=1&subtype=0',
        port: 8115
    }
  ];
  const streamsQualidade:ReadonlyArray<Stream> = [
    {
      reference: {
          default: "CQ FÍSICO QUÍMICO | BANCADAS",
          english: "PHYSICO-CHEMICAL QC | BENCHES"
      },
      url: 'rtsp://tv:Bionovis@2024tv@172.16.0.85:554/cam/realmonitor?channel=1&subtype=0',
      port: 8082
    },
    {
        reference: {
            default: "CQ FÍSICO QUÍMICO | BANCADAS",
            english: "PHYSICO-CHEMICAL QC | BENCHES"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.83:554/cam/realmonitor?channel=1&subtype=0',
        port: 8083
    },
    {
        reference: {
            default: "GARANTIA DA QUALIDADE | ESCRITÓRIO (FUNDOS)",
            english: "QUALITY ASSURANCE | OFFICE (BACK)"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.165:554/cam/realmonitor?channel=1&subtype=0',
        port: 8084
    }
  ];

  const streamsArquivos = [
    // { url: 'rtsp://admin:bruno123@192.168.2.233:554/cam/realmonitor?channel=1&subtype=0', port: 8094 },
    // { url: 'rtsp://admin:bruno123@192.168.2.233:554/cam/realmonitor?channel=1&subtype=0', port: 8095 },
  ]

  const streams = [...streamsPreparations, ...streamsUpstreams, ...streamsDownStreams, ...streamsAreaPassagem, ...streamsFillAndFinish, ...streamsEmbalagemSecundaria, ...streamsLogistica, ...streamsQualidade];

  streams.forEach(stream => {
    const server = new websocket.Server({ port: stream.port });
    server.on('connection', (socket) => {
      console.log(`Cliente conectado ao websocket na porta ${stream.port}`);

      // const ffmpeg = spawn('ffmpeg', [
      //   '-rtsp_transport', 'tcp',
      //   '-i', stream.url,
      //   '-f', 'mpegts',
      //   '-codec:v', 'mpeg1video',
      //   '-s', '2560x1440',
      //   '-b:v', '100000k',
      //   '-r', '60',
      //   '-bf', '0',
      //   '-codec:a', 'mp2',
      //   '-ar', '48000',
      //   '-ac', '2',
      //   '-b:a', '320k',
      //   '-f', 'mpegts',
      //   'pipe:1'
      // ]);

      const ffmpeg = spawn('ffmpeg', [
        '-rtsp_transport', 'tcp',           
        '-i', stream.url,                   
        '-f', 'mpegts',                     
        '-codec:v', 'mpeg1video',           
        '-s', '3840x2160',                  
        '-b:v', '100000k',                  
        '-r', '30',                          
        '-bf', '0',                         
        '-codec:a', 'mp2',                 
        '-ar', '48000',                     
        '-ac', '2',                         
        '-b:a', '320k',                     
        'pipe:1'                            
      ]);
      

      ffmpeg.stdout.on('data', (data) => {
        socket.send(data, { binary: true });
      });

      ffmpeg.stderr.on('data', (data) => {
        console.error(`ffmpeg stderr: ${data}`);
      });

      ffmpeg.on('error', (error) => {
        console.error(`FFmpeg process error: ${error.message}`);
      });

      ffmpeg.on('exit', (code, signal) => {
        console.log(`FFmpeg process exited with code ${code} and signal ${signal}`);
      });

      socket.on('close', () => {
        console.log("Cliente desconectado do websocket");
        ffmpeg.kill('SIGINT');
      });

      socket.on('error', (err) => {
        console.error('websocket error: ', err);
      });
    });
  });

  const server = http.createServer((req, res) => {
    // Configura os cabeçalhos de CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    const liveCamsRoute:string = "/live-cams/streams-";
    const hashtable = {};
    hashtable[`${liveCamsRoute}preparations`] = streamsPreparations;
    hashtable[`${liveCamsRoute}upstreams`] = streamsUpstreams;
    hashtable[`${liveCamsRoute}downstreams`] = streamsDownStreams;
    hashtable[`${liveCamsRoute}area-passagem`] = streamsAreaPassagem;
    hashtable[`${liveCamsRoute}fill-and-finish`] = streamsFillAndFinish;
    hashtable[`${liveCamsRoute}embalagem-secundaria`] = streamsEmbalagemSecundaria;
    hashtable[`${liveCamsRoute}logistica`] = streamsLogistica;
    hashtable[`${liveCamsRoute}arquivos`] = streamsArquivos;
    hashtable[`${liveCamsRoute}qualidade`] = streamsQualidade;
    if (hashtable[req.url]) {
        const ports = hashtable[req.url].map((stream:Stream) => ({
          port: stream.port,
          reference: stream.reference
        }));
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(ports));
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

  server.listen(3000, () => {
    console.log('Servidor HTTP ouvindo na porta 3000');
  });
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron.bionovis');
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });
  createWindow();
  startServer();
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});