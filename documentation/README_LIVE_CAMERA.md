# Funcionamento de câmeras ao vivo

## Configuração Necessária
É crucial que o arquivo `ffmpeg.exe` esteja incluído nas variáveis de ambiente do sistema operacional. Isso permite que as câmeras ao vivo sejam reproduzidas através do protocolo RTSP.

## Dependências
A aplicação não possui dependências online, operando 100% local.

## Websocket RTSP
A comunicação com as câmeras é feita através do protocolo RTSP via WebSocket no arquivo: **src/main/Server/WebSocketConnection.ts**.

## Reprodução das cameras.
O frontend consome esse vídeo através da API: **src/main/Routes/LiveCameraRoutes.ts**.



