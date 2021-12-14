import { Router } from 'express';
import SseChannel from 'sse-channel';

const router = Router();
const dataChannel = new SseChannel({
  retryTimeout: 250,
  historySize: 300,
  jsonEncode: true,
});
router.get('/', (req, res) => {
  dataChannel.addClient(req, res);

  req.app.on('myCustomSSEMsg', (data) => {
    console.log(data);
    dataChannel.send({ data });
  });
});

export default router;
