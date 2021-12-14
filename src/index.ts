import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../routes/routes';
import { isCloudyToday } from './middlewares/isCloudyToday';

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

app.listen(3000, () => {
  console.log('The application is listening on port 3000!');
});
