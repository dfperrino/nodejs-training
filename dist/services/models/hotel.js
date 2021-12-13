"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const HotelSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    stars: {
        type: Number,
        required: [true, 'Stars are required'],
        validate: {
            validator: (stars) => stars >= 0 && stars <= 5,
            message: 'Stars must have a value between 0 and 5',
        },
    },
});
const Hotel = (0, mongoose_1.model)('hotel', HotelSchema);
exports.default = Hotel;
//# sourceMappingURL=hotel.js.map