import websocket from "ws";
import { spawn } from "child_process";
export function GetAllCamsRoute() {
    // const streams = [
    //   { url: 'rtsp://admin:bruno123@192.168.2.233:554/cam/realmonitor?channel=1&subtype=0', port: 8082 },
    //   { url: 'rtsp://admin:bruno123@192.168.2.233:554/cam/realmonitor?channel=1&subtype=0', port: 8083 },
    // ];
    
    type Stream = {
      reference: { default:string, english:string },
      url: string,
      port: number,
      image: string,
    };
    const streamsPreparations:ReadonlyArray<Stream> = [
    //   {
    //     reference:{
    //       default:"Teste Cam",
    //       english:"Test Cam"
    //     },
    //     url: 'rtsp://admin:bruno123@192.168.2.233:554/cam/realmonitor?channel=1&subtype=0',
    //     port: 4000,
    //     image: "027.png"
    //   },
      {
          reference: {
              default: "PRODUÇÃO | PREPARO DE MEIO MPOA",
              english: "PRODUCTION | MPOA MEDIUM PREPARATION"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.27:554/cam/realmonitor?channel=1&subtype=0',
          port: 8091,
          image: "027.png"
      },
      {
          reference: {
              default: "PRODUÇÃO | PREPARO DE SOLUÇÕES",
              english: "PRODUCTION | SOLUTIONS PREPARATION"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.20:554/cam/realmonitor?channel=1&subtype=0',
          port: 8092,
          image:"020.png"
      },
      {
          reference: {
              default: "PRODUÇÃO | LAVAGEM",
              english: "PRODUCTION | WASHING"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.43:554/cam/realmonitor?channel=1&subtype=0',
          port: 8093,
          image:"043.png"
      },
      {
          reference: {
              default: "PRODUÇÃO | MONTAGEM",
              english: "PRODUCTION | ASSEMBLY"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.30:554/cam/realmonitor?channel=1&subtype=0',
          port: 8094,
          image:"030.png"
      },
      {
          reference: {
              default: "PRODUÇÃO | LAVAGEM",
              english: "PRODUCTION | WASHING"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.51:554/cam/realmonitor?channel=1&subtype=0',
          port: 8095,
          image:"051.png"
      },
      {
          reference: {
              default: "PRODUÇÃO | MONTAGEM",
              english: "PRODUCTION | ASSEMBLY"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.50:554/cam/realmonitor?channel=1&subtype=0',
          port: 8096,
          image:"050.png"
      }
    ];
    const streamsUpstreams:ReadonlyArray<Stream> = [
      {
          reference: {
              default: "PRODUÇÃO | BANCO DE CÉLULAS",
              english: "PRODUCTION | CELL BANK"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.56:554/cam/realmonitor?channel=1&subtype=0',
          port: 8085,
          image:"056.png"
      },
      {
          reference: {
              default: "PRODUÇÃO | INOCULAÇÃO",
              english: "PRODUCTION | INOCULATION"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.54:554/cam/realmonitor?channel=1&subtype=0',
          port: 8086,
          image:"054.png"
      },
      {
          reference: {
              default: "PRODUÇÃO | CULTURA CELULAR",
              english: "PRODUCTION | CELL CULTURE"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.26:554/cam/realmonitor?channel=1&subtype=0',
          port: 8087,
          image:"026.png"
      }
    ];
    const streamsDownStreams:ReadonlyArray<Stream> = [
      {
          reference: {
              default: "PRODUÇÃO | RECUPERAÇÃO PRIMÁRIA",
              english: "PRODUCTION | PRIMARY RECOVERY"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.17:554/cam/realmonitor?channel=1&subtype=0',
          port: 8088,
          image:"017.png"
      },
      {
          reference: {
              default: "PRODUÇÃO | PURIFICAÇÃO",
              english: "PRODUCTION | PURIFICATION"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.18:554/cam/realmonitor?channel=1&subtype=0',
          port: 8089,
          image:"018.png"
      },
      {
          reference: {
              default: "PRODUÇÃO | PURIFICAÇÃO FINAL",
              english: "PRODUCTION | FINAL PURIFICATION"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.34:554/cam/realmonitor?channel=1&subtype=0',
          port: 8090,
          image:"034.png"
      }
    ];
    const streamsAreaPassagem:ReadonlyArray<Stream> = [
      {
          reference: {
              default: "PRODUÇÃO | CORREDOR SALAS DE REUNIÕES",
              english: "PRODUCTION | MEETING ROOMS HALLWAY"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.10:554/cam/realmonitor?channel=1&subtype=0',
          port: 8097,
          image: "010.png"
      },
      {
          reference: {
              default: "PRODUÇÃO | CORREDOR DISTRIBUIÇÃO",
              english: "PRODUCTION | DISTRIBUTION HALLWAY"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.11:554/cam/realmonitor?channel=1&subtype=0',
          port: 8098,
          image:"011.png"
      },
      { 
          reference: {
              default: "PRODUÇÃO | CORREDOR DE DISTRIBUIÇÃO",
              english: "PRODUCTION | DISTRIBUTION HALLWAY"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.25:554/cam/realmonitor?channel=1&subtype=0',
          port: 8099,
          image:"025.png"
      },
      {
          reference: {
              default: "PRODUÇÃO | CORREDOR DE RETORNO",
              english: "PRODUCTION | RETURN HALLWAY"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.19:554/cam/realmonitor?channel=1&subtype=0',
          port: 8100,
          image:"019.png"
      }
    ];
    const streamsFillAndFinish:ReadonlyArray<Stream> = [
      {
          reference: {
              default: "FORMULAÇÃO E ENVASE | LAVAGEM",
              english: "FORMULATION AND FILLING | WASHING"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.36:554/cam/realmonitor?channel=1&subtype=0',
          port: 8101,
          image:"036.png"
      },
      {
          reference: {
              default: "FORMULAÇÃO E ENVASE | MONTAGEM",
              english: "FORMULATION AND FILLING | ASSEMBLY"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.21:554/cam/realmonitor?channel=1&subtype=0',
          port: 8102,
          image:"021.png"
      },
      {
          reference: {
              default: "FORMULAÇÃO E ENVASE | FORMULAÇÃO",
              english: "FORMULATION AND FILLING | FORMULATION"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.15:554/cam/realmonitor?channel=1&subtype=0',
          port: 8103,
          image: "015.png"
      },
      {
          reference: {
              default: "FORMULAÇÃO E ENVASE | ENVASE ASSÉPTICO",
              english: "FORMULATION AND FILLING | ASEPTIC FILLING"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.39:554/cam/realmonitor?channel=1&subtype=0',
          port: 8104,
          image:"039.png"
      },
      {
          reference: {
              default: "FORMULAÇÃO E ENVASE | ENVASE ASSÉPTICO",
              english: "FORMULATION AND FILLING | ASEPTIC FILLING"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.40:554/cam/realmonitor?channel=1&subtype=0',
          port: 8105,
          image:"040.png"
      }
    ];
    const streamsEmbalagemSecundaria:ReadonlyArray<Stream> = [
      {
          reference: {
              default: "EMBALAGEM SECUNDÁRIA | BAIA 02 (FUTURA)",
              english: "SECONDARY PACKAGING | BAY 02 (FUTURE)"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.7:554/cam/realmonitor?channel=1&subtype=0',
          port: 8106,
          image:"007.png"
      },
      {
          reference: {
              default: "EMBALAGEM SECUNDÁRIA | BAIA 02 (FUTURA)",
              english: "SECONDARY PACKAGING | BAY 02 (FUTURE)"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.42:554/cam/realmonitor?channel=1&subtype=0',
          port: 8107,
          image:"042.png"
      },
      {
          reference: {
              default: "EMBALAGEM SECUNDÁRIA | BAIA 01",
              english: "SECONDARY PACKAGING | BAY 01"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.41:554/cam/realmonitor?channel=1&subtype=0',
          port: 8108,
          image:"041.png"
      },
      {
          reference: {
              default: "EMBALAGEM SECUNDÁRIA | BAIA 01",
              english: "SECONDARY PACKAGING | BAY 01"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.6:554/cam/realmonitor?channel=1&subtype=0',
          port: 8109,
          image: "006.png"
      }
    ];
    const streamsLogistica:ReadonlyArray<Stream> = [
      {
          reference: {
              default: "LOGÍSTICA | CÂMARA FRIA",
              english: "LOGISTICS | COLD CHAMBER"
          },
          url: 'rtsp://tv:Bionovis2024tv@172.16.0.127:554/cam/realmonitor?channel=1&subtype=0',
          port: 8110,
          image:"127.png"
      },
      {
          reference: {
              default: "LOGÍSTICA | CÂMARA FRIA",
              english: "LOGISTICS | COLD CHAMBER"
          },
          url: 'rtsp://tv:Bionovis2024tv@172.16.0.124:554/cam/realmonitor?channel=1&subtype=0',
          port: 8111,
          image:"124.png"
      },
      {
          reference: {
              default: "LOGÍSTICA | DOCA FRIA",
              english: "LOGISTICS | COLD DOCK"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.123:554/cam/realmonitor?channel=1&subtype=0',
          port: 8112,
          image:"123.png"
      },
      {
          reference: {
              default: "LOGÍSTICA | DOCA FRIA",
              english: "LOGISTICS | COLD DOCK"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.118:554/cam/realmonitor?channel=1&subtype=0',
          port: 8113,
          image:"118.png"
      },
      {
          reference: {
              default: "LOGÍSTICA | INVÓLUCRO",
              english: "LOGISTICS | WRAPPING"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.122:554/cam/realmonitor?channel=1&subtype=0',
          port: 8114,
          image:"122.png"
      },
      {
          reference: {
              default: "LOGÍSTICA | ESCRITÓRIO",
              english: "LOGISTICS | OFFICE"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.129:554/cam/realmonitor?channel=1&subtype=0',
          port: 8115,
          image:"129.png"
      }
    ];
    const streamsQualidade:ReadonlyArray<Stream> = [
      {
        reference: {
            default: "CQ FÍSICO QUÍMICO | BANCADAS",
            english: "PHYSICO-CHEMICAL QC | BENCHES"
        },
        url: 'rtsp://tv:Bionovis@2024tv@172.16.0.85:554/cam/realmonitor?channel=1&subtype=0',
        port: 8082,
        image:"085.png"
      },
      {
          reference: {
              default: "CQ FÍSICO QUÍMICO | BANCADAS",
              english: "PHYSICO-CHEMICAL QC | BENCHES"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.83:554/cam/realmonitor?channel=1&subtype=0',
          port: 8083,
          image:"083.png"
      },
      {
          reference: {
              default: "GARANTIA DA QUALIDADE | ESCRITÓRIO (FUNDOS)",
              english: "QUALITY ASSURANCE | OFFICE (BACK)"
          },
          url: 'rtsp://tv:Bionovis@2024tv@172.16.0.165:554/cam/realmonitor?channel=1&subtype=0',
          port: 8084,
          image:"165.png"
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

    const liveCamsRoute:string = "/live-cams/streams-";
    const routeMapHashTable = {};
    routeMapHashTable[`${liveCamsRoute}preparations`] = streamsPreparations;
    routeMapHashTable[`${liveCamsRoute}upstreams`] = streamsUpstreams;
    routeMapHashTable[`${liveCamsRoute}downstreams`] = streamsDownStreams;
    routeMapHashTable[`${liveCamsRoute}area-passagem`] = streamsAreaPassagem;
    routeMapHashTable[`${liveCamsRoute}fill-and-finish`] = streamsFillAndFinish;
    routeMapHashTable[`${liveCamsRoute}embalagem-secundaria`] = streamsEmbalagemSecundaria;
    routeMapHashTable[`${liveCamsRoute}logistica`] = streamsLogistica;
    routeMapHashTable[`${liveCamsRoute}arquivos`] = streamsArquivos;
    routeMapHashTable[`${liveCamsRoute}qualidade`] = streamsQualidade;

    return routeMapHashTable;
}

export default { GetAllCamsRoute };