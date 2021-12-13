import { IHotelInfo, IHotelService } from './interfaces';
import Hotel, { IHotel } from './models/hotel';
import { mapHotelFromAPIToDB, mapHotelFromDBToAPI } from './utils';

class HotelService implements IHotelService {
  searchAll: () => Promise<void | IHotelInfo[]> = () => {
    return Hotel.find({})
      .then((hotels) => {
        if (hotels) {
          return hotels.map((hotel) => mapHotelFromDBToAPI(hotel));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  create: (hotelProps: IHotelInfo) => Promise<void | IHotelInfo> = (
    hotelProps
  ) => {
    const hotel: IHotel = mapHotelFromAPIToDB(hotelProps);
    return Hotel.create(hotel).then((newHotel) => {
      return mapHotelFromDBToAPI(newHotel);
    });
  };
  update: (
    hotelProps: IHotelInfo,
    hotelId: string
  ) => Promise<void | IHotelInfo> = (hotelProps, hotelId) => {
    const hotel: IHotel = mapHotelFromAPIToDB(hotelProps);
    return Hotel.findByIdAndUpdate(hotelId, hotel).then(() => {
      Hotel.findById(hotelId).then((updatedHotel) => {
        return mapHotelFromDBToAPI(updatedHotel);
      });
    });
  };

  delete: (hotelId: string) => Promise<any> = (hotelId) => {
    return Hotel.findByIdAndDelete(hotelId).exec();
  };
  searchById: (hotelId: string) => Promise<void | IHotelInfo> = (hotelId) => {
    return Hotel.findById(hotelId)
      .then((hotel) => {
        if (hotel) {
          return mapHotelFromDBToAPI(hotel);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
}

export default HotelService;
