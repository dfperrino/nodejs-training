import { Schema, model } from 'mongoose';

export interface IHotel {
  id?: string;
  name: string;
  stars: number;
}

const HotelSchema = new Schema<IHotel>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  stars: {
    type: Number,
    required: [true, 'Stars are required'],
    validate: {
      validator: (stars: number) => stars >= 0 && stars <= 5,
      message: 'Stars must have a value between 0 and 5',
    },
  },
});

const Hotel = model('hotel', HotelSchema);

export default Hotel;
