import { Request as ExpressRequest } from 'express';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  Route,
  Tags,
} from 'tsoa';
import KafkaService from '../services/KafkaService';

@Route('/kafka')
@Tags('KafkaController')
export class KafkaController extends Controller {
  @Response(401, 'Unauthorized')
  @Post('/produce')
  produceMessage(@Body() val: any): Promise<boolean> {
    return KafkaService.produceMessage(val);
  }

  @Get('/consume')
  consumeMessage(@Request() request: ExpressRequest): Promise<string> {
    KafkaService.consumeMessage(request.app).then((res) => {
      console.log('Consuming kafka messages via websockets');
    });
    return Promise.resolve('ok');
  }

  @Get('/stop-consume')
  stopConsumeMessage(): Promise<string> {
    KafkaService.stopConsumeMessage();
    return Promise.resolve('ok');
  }
}
