"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized - no token provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "object" && "id" in decoded) {
            req.user = { id: decoded.id };
        }
        else {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized - invalid token" });
        }
        next();
    }
    catch (error) {
        console.error("Error in verifyToken:", error);
        return res
            .status(401)
            .json({ success: false, message: "Unauthorized - invalid token" });
    }
};
exports.verifyToken = verifyToken;
