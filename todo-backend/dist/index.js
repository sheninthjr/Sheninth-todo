"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 3003;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/', userRoute_1.default);
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
mongoose_1.default.connect('mongodb+srv://sheninthjr:Sheninth23@todo.on3kfnx.mongodb.net/Jr-Todo', { dbName: "Jr-Todo" });
