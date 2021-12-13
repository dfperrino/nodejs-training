"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapHotelFromDBToAPI = exports.mapHotelFromAPIToDB = void 0;
const mapHotelFromAPIToDB = (a) => {
    return {
        name: a.name,
        stars: a.stars_q,
    };
};
exports.mapHotelFromAPIToDB = mapHotelFromAPIToDB;
const mapHotelFromDBToAPI = (a) => {
    return {
        id: a.id,
        name: a.name,
        stars_q: a.stars,
    };
};
exports.mapHotelFromDBToAPI = mapHotelFromDBToAPI;
//# sourceMappingURL=utils.js.map