import express from 'express';
import hotelRouter from './routes/hotels';
import { connect } from 'mongoose';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  connect('mongodb://localhost/hotels');
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/hotels', hotelRouter);

export default app;
