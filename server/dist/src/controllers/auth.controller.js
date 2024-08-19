"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = exports.resetPassword = exports.forgotPassword = exports.logout = exports.login = exports.verifyEmail = exports.signup = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
const utils_1 = require("../utils");
const generateTokenAndSetCookie_1 = require("../utils/generateTokenAndSetCookie");
const emails_1 = require("../mailtrap/emails");
const prisma = new client_1.PrismaClient();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required!",
            });
        }
        const userExists = yield prisma.user.findUnique({
            where: { email },
        });
        if (userExists) {
            return res
                .status(400)
                .json({ success: false, message: "User already exists!" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const verificationToken = (0, utils_1.generateVerificationToken)();
        const verificationExpires = (0, utils_1.verificationTokenExpiresAt)();
        const user = yield prisma.user.create({
            data: {
                name,
                email,
                hashedPassword,
                verificationToken,
                verificationTokenExpiresAt: verificationExpires,
            },
        });
        (0, generateTokenAndSetCookie_1.generateTokenAndSetCookie)(res, user.id);
        (0, emails_1.sendVerificationEmail)(user.email, verificationToken);
        res.status(201).json({
            success: true,
            message: "User created!",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified,
            },
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.signup = signup;
const verifyEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.body;
    try {
        const user = yield prisma.user.findFirst({
            where: {
                verificationToken: token,
                verificationTokenExpiresAt: {
                    gt: new Date(),
                },
            },
        });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Invalid or expired token" });
        }
        yield prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                isVerified: true,
                verificationToken: null,
                verificationTokenExpiresAt: null,
            },
        });
        yield (0, emails_1.sendWelcomeEmail)(user.email, user.name);
        return res
            .status(200)
            .json({ success: true, message: "Email verified successfully" });
    }
    catch (error) {
        console.error(error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
});
exports.verifyEmail = verifyEmail;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        (0, generateTokenAndSetCookie_1.generateTokenAndSetCookie)(res, user.id);
        user.lastLogin = new Date();
        yield prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                lastLogin: new Date(),
            },
        });
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            user: { name: user.name, email: user.email },
        });
    }
    catch (error) {
        console.log("Error logging in", error);
        return res.status(400).json({ success: false, message: error.message });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // All I have to do is to clear the cookie
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Logged out successfully" });
});
exports.logout = logout;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const resetPasswordToken = crypto_1.default.randomBytes(20).toString("hex");
        const resetPasswordTokenExpiresAt = new Date(Date.now() + 1 * 60 * 60 * 1000);
        yield prisma.user.update({
            where: {
                email,
            },
            data: {
                resetPasswordToken,
                resetPasswordTokenExpiresAt,
            },
        });
        yield (0, emails_1.sendPasswordResetEmail)(user.email, `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`);
        res.status(200).json({
            success: true,
            message: "Password reset link sent to your email successfully",
        });
    }
    catch (error) {
        console.error("Error in forgot password ", error);
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const user = yield prisma.user.findFirst({
            where: {
                verificationToken: token,
                verificationTokenExpiresAt: {
                    gt: new Date(),
                },
            },
        });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                hashedPassword,
                resetPasswordToken: null,
                resetPasswordTokenExpiresAt: null,
            },
        });
        yield (0, emails_1.sendResetSuccessEmail)(user.email);
        res
            .status(200)
            .json({ success: true, message: "Password reset successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
exports.resetPassword = resetPassword;
const checkAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = yield prisma.user.findFirst({
            where: {
                id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id,
            }
        });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            user: { name: user.name, email: user.email, id: user.id },
        });
    }
    catch (error) {
        console.error("Error in check auth", error);
        res.status(400).json({ success: false, message: error.message });
    }
});
exports.checkAuth = checkAuth;
