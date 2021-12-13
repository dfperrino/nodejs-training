"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HotelService_1 = __importDefault(require("../services/HotelService"));
const router = express_1.default.Router();
router.get('/', (req, res) => {
    const hotelService = new HotelService_1.default();
    return hotelService
        .searchAll()
        .then((response) => res.json(response))
        .catch((error) => res.send(error));
});
router.post('/', (req, res) => {
    const hotelService = new HotelService_1.default();
    const hotelProps = req.body;
    return hotelService
        .create(hotelProps)
        .then((response) => res.json(response))
        .catch((error) => res.send(error));
});
router.put('/:id', (req, res) => {
    const hotelService = new HotelService_1.default();
    const hotelId = req.params.id;
    const hotelProps = req.body;
    return hotelService
        .update(hotelProps, hotelId)
        .then((response) => res.json(response))
        .catch((error) => res.send(error));
});
router.delete('/:id', (req, res) => {
    const hotelService = new HotelService_1.default();
    const hotelId = req.params.id;
    return hotelService
        .delete(hotelId)
        .then(() => res.json({}))
        .catch(() => res.send('Error'));
});
router.get('/:id', (req, res) => {
    const hotelService = new HotelService_1.default();
    const hotelId = req.params.id;
    return hotelService
        .searchById(hotelId)
        .then((response) => res.json(response))
        .catch((error) => res.send(error));
});
exports.default = router;
//# sourceMappingURL=hotels.js.map