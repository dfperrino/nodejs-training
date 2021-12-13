import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

export const isCloudyToday: (
  req: Request,
  res: Response,
  next: NextFunction
) => void = (_req, res, next) => {
  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=Valladolid&appid=${process.env.WEATHER_API_KEY}`
    )
    .then((response) => {
      if (
        response.data &&
        response.data.weather.length > 0 /*&&
        response.data.weather[0].description === 'clear'*/
      ) {
        res.setHeader('weather', response.data.weather[0].description);
        return next();
      }
      return res
        .status(401)
        .send('You cannot access this app if you have no clear weather');
    });
};
