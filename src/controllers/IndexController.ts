import { Controller, Get, Response, Route, Tags } from 'tsoa';

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
}
