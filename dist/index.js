"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hotels_1 = __importDefault(require("./routes/hotels"));
const mongoose_1 = require("mongoose");
const app = (0, express_1.default)();
if (process.env.NODE_ENV !== 'test') {
    (0, mongoose_1.connect)('mongodb://localhost/hotels');
}
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/hotels', hotels_1.default);
app.listen(3050, () => {
    console.log('Running on 3050 port');
});
//# sourceMappingURL=index.js.map