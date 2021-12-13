import express from 'express';
import HotelService from '../services/HotelService';
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

router.get('/:id', (req, res) => {
  const hotelService = new HotelService();
  const hotelId = req.params.id;
  return hotelService
    .searchById(hotelId)
    .then((response) => res.json(response))
    .catch((error) => res.send(error));
});

export default router;
