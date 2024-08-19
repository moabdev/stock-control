"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationTokenExpiresAt = exports.generateVerificationToken = void 0;
const generateVerificationToken = () => Math.floor(100000 + Math.random() * 900000).toString();
exports.generateVerificationToken = generateVerificationToken;
const verificationTokenExpiresAt = () => new Date(Date.now() + 24 * 60 * 60 * 1000);
exports.verificationTokenExpiresAt = verificationTokenExpiresAt;
