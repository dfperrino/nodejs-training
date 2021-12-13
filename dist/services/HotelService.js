"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hotel_1 = __importDefault(require("./models/hotel"));
const utils_1 = require("./utils");
class HotelService {
    constructor() {
        this.searchAll = () => {
            return hotel_1.default.find({})
                .then((hotels) => {
                if (hotels) {
                    return hotels.map((hotel) => (0, utils_1.mapHotelFromDBToAPI)(hotel));
                }
            })
                .catch((error) => {
                console.error(error);
            });
        };
        this.create = (hotelProps) => {
            const hotel = (0, utils_1.mapHotelFromAPIToDB)(hotelProps);
            return hotel_1.default.create(hotel).then((newHotel) => {
                return (0, utils_1.mapHotelFromDBToAPI)(newHotel);
            });
        };
        this.update = (hotelProps, hotelId) => {
            const hotel = (0, utils_1.mapHotelFromAPIToDB)(hotelProps);
            return hotel_1.default.findByIdAndUpdate(hotelId, hotel).then(() => {
                hotel_1.default.findById(hotelId).then((updatedHotel) => {
                    return (0, utils_1.mapHotelFromDBToAPI)(updatedHotel);
                });
            });
        };
        this.delete = (hotelId) => {
            return hotel_1.default.findByIdAndDelete(hotelId).exec();
        };
        this.searchById = (hotelId) => {
            return hotel_1.default.findById(hotelId)
                .then((hotel) => {
                if (hotel) {
                    return (0, utils_1.mapHotelFromDBToAPI)(hotel);
                }
            })
                .catch((error) => {
                console.error(error);
            });
        };
    }
}
exports.default = HotelService;
//# sourceMappingURL=HotelService.js.map