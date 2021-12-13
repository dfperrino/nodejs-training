import express from 'express';
import HotelService from '../services/HotelService';
import { authenticateRequest } from './auth';
const router = express.Router();

router.get('/', (req, res) => {
  const hotelService = new HotelService();
  return hotelService
    .searchAll()
    .then((response) => res.json(response))
    .catch((error) => res.send(error));
});

router.post('/', (req, res) => {
  const hotelService = new HotelService();
  const hotelProps = req.body;
  return hotelService
    .create(hotelProps)
    .then((response) => res.json(response))
    .catch((error) => res.send(error));
});

router.put('/:id', (req, res) => {
  const hotelService = new HotelService();
  const hotelId = req.params.id;
  const hotelProps = req.body;
  return hotelService
    .update(hotelProps, hotelId)
    .then((response) => res.json(response))
    .catch((error) => res.send(error));
});

router.delete('/:id', (req, res) => {
  const hotelService = new HotelService();
  const hotelId = req.params.id;
  return hotelService
    .delete(hotelId)
    .then(() => res.json({}))
    .catch(() => res.send('Error'));
});

router.get('/:id', authenticateRequest, (req, res) => {
  const hotelService = new HotelService();
  const hotelId = req.params.id;
  console.log(res.locals.user);
  if (res.locals.user.roles.includes('admin')) {
    return hotelService
      .searchById(hotelId)
      .then((response) => res.json(response))
      .catch((error) => res.send(error));
  }
  return res.status(401).send();
});

export default router;
