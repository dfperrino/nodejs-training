export interface IHotelInfo {
  id?: string;
  name: string;
  stars_q: number;
}

export interface IHotelService {
  searchAll: () => Promise<void | IHotelInfo[]>;
  create: (hotelProps: IHotelInfo) => Promise<void | IHotelInfo>;
  update: (hotelProps: IHotelInfo, id: string) => Promise<void | IHotelInfo>;
  delete: (id: string) => Promise<void>;
  searchById: (id: string) => Promise<void | IHotelInfo>;
}
