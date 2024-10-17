"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("@config/database");
const server_1 = __importDefault(require("./shared/infra/http/server"));
database_1.AppDataSource.initialize().then(() => {
    server_1.default.listen(3000, () => {
        console.log('Server running on port 3000');
    });
});
