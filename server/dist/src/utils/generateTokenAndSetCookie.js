"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenAndSetCookie = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateTokenAndSetCookie = (res, userId) => {
    const token = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    res.cookie("token", token, {
        httpOnly: true, // prevents JS from reading the cookie (xss attacks)
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // prevents CSRF
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
    return token;
};
exports.generateTokenAndSetCookie = generateTokenAndSetCookie;
