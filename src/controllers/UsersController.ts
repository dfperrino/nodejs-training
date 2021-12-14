import { Controller, Get, Response, Route, Tags } from 'tsoa';
import { IBasicUserInfo } from '../services/types';
import { UserService } from '../services/UserService';

@Route('/users')
@Tags('UsersController')
export class UsersController extends Controller {
  @Response(401, 'Unauthorized')
  @Get('/')
  getUsers(): Promise<IBasicUserInfo> {
    const userService = new UserService();
    return userService
      .getUserInfo()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(error);
        return null;
      });
  }
}
