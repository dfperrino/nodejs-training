import { IHotelInfo } from "./interfaces";
import { IHotel } from "./models/hotel";

export const mapHotelFromAPIToDB = (a: IHotelInfo): IHotel => {
  return {
    name: a.name,
    stars: a.stars_q,
  };
};

export const mapHotelFromDBToAPI = (a: IHotel): IHotelInfo => {
  return {
    id: a.id,
    name: a.name,
    stars_q: a.stars,
  };
};
