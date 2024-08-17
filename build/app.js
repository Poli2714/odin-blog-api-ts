"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5006;
app.get('/', (req, res) => {
    console.log(req);
    res.send('Hello world!');
});
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`));
