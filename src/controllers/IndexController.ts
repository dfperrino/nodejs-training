import { Request as ExpressRequest } from 'express';
import os from 'os';
import { Controller, Get, Request, Response, Route, Tags } from 'tsoa';

interface GetInfoResponse {
  title: string;
}

@Route('/')
@Tags('IndexController')
export class IndexController extends Controller {
  @Response(401, 'Unauthorized')
  @Get('/info')
  getInfo(): GetInfoResponse {
    return { title: 'hola' };
  }

  @Get('/ws-message')
  sendWSMessage(@Request() request: ExpressRequest): void {
    setTimeout(() => {
      request.app.emit(
        'myCustomWSMsg',
        JSON.stringify({ freemem: os.freemem(), loadavg: os.loadavg()[0] })
      );
    }, 2500);
  }

  @Get('/sse-message')
  sendSSEMessage(@Request() request: ExpressRequest): void {
    setTimeout(() => {
      request.app.emit('myCustomSSEMsg', {
        freemem: os.freemem(),
        loadavg: os.loadavg()[0],
      });
    }, 2500);
  }
}
