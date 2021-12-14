import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import WebSocket from 'ws';
import { RegisterRoutes } from '../routes/routes';
import { isCloudyToday } from './middlewares/isCloudyToday';
import sseRoute from './sseRoute';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(isCloudyToday);
app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '/swagger.json',
    },
  })
);

RegisterRoutes(app);

/* Definición websocket server */
const wss = new WebSocket.Server({ noServer: true });
wss.on('connection', (ws) => {
  console.log('Websocket server is up!');
  ws.on('message', (data) => {
    console.log('message: %s', data);
  });
  app.on('myCustomWSMsg', (data) => {
    ws.send(data);
  });
});

app.use('/sse', sseRoute);

/* http server */
const httpServer = app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
httpServer.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit('connection', socket, request);
  });
});
