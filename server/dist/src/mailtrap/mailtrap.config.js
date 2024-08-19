"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sender = exports.mailtrapClient = void 0;
const mailtrap_1 = require("mailtrap");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.mailtrapClient = new mailtrap_1.MailtrapClient({
    endpoint: process.env.MAILTRAP_ENDPOINT,
    token: process.env.MAILTRAP_TOKEN,
});
exports.sender = {
    email: "mailtrap@demomailtrap.com",
    name: "Moab Macena",
};
