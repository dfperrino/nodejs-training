import { Application } from 'express';
import { Consumer, KafkaClient, Producer, ProduceRequest } from 'kafka-node';

export interface IKafkaService {
  producer: Producer;
  client: KafkaClient;
  consumer: Consumer;
  isProducerReady: boolean;
  produceMessage: (payload: any) => Promise<boolean>;
}
class KafkaService implements IKafkaService {
  producer: Producer;
  client: KafkaClient;
  consumer: Consumer;
  isProducerReady = false;

  constructor() {
    console.log('creamos nueva instancia de kafkaservice');
    this.client = new KafkaClient();
    this.producer = new Producer(this.client);
    this.consumer = new Consumer(
      this.client,
      [{ topic: 'nodejs-course-topic' }],
      {
        autoCommit: true,
      }
    );
  }

  produceMessage: (payload: any) => Promise<boolean> = (payload) => {
    return new Promise((resolve) => {
      const realPayload: ProduceRequest = {
        topic: 'nodejs-course-topic',
        messages: JSON.stringify(payload),
      };
      this.producer.send([realPayload], (error, data) => {
        if (error) {
          console.error(error);
          return resolve(false);
        }
        console.log(data);
        return resolve(true);
      });
    });
  };

  consumeMessage: (app: Application) => Promise<boolean> = (app) => {
    return new Promise((resolve) => {
      this.consumer.on('offsetOutOfRange', (msg) => {
        console.error(msg);
        return resolve(false);
      });
      this.consumer.on('error', (message) => {
        console.error(message);
        return resolve(false);
      });
      this.consumer.on('message', (message) => {
        console.log(message, 'consumeMessage');
        app.emit('myCustomWSMsg', message);
        return resolve(true);
      });
    });
  };

  stopConsumeMessage: () => void = () => {
    this.consumer.removeAllListeners();
  };
}

export default new KafkaService();
