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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResetSuccessEmail = exports.sendPasswordResetEmail = exports.sendWelcomeEmail = exports.sendVerificationEmail = void 0;
const emailTemplates_1 = require("./emailTemplates");
const mailtrap_config_1 = require("./mailtrap.config");
const sendVerificationEmail = (email, verificationToken) => __awaiter(void 0, void 0, void 0, function* () {
    const recipient = [{ email }];
    try {
        const response = yield mailtrap_config_1.mailtrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            subject: "Verify your email",
            html: emailTemplates_1.VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: "Email Verification",
        });
        console.log("Email sent successfully", response);
    }
    catch (error) {
        console.error(`Error sending verification`, error);
        throw new Error(`Error sending verification email: ${error}`);
    }
});
exports.sendVerificationEmail = sendVerificationEmail;
const sendWelcomeEmail = (email, name) => __awaiter(void 0, void 0, void 0, function* () {
    const recipient = [{ email }];
    try {
        const response = yield mailtrap_config_1.mailtrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            template_uuid: "e65925d1-a9d1-4a40-ae7c-d92b37d593df",
            template_variables: {
                company_info_name: "Auth Company",
                name: name,
            },
        });
        console.log("Welcome email sent successfully", response);
    }
    catch (error) {
        console.error(`Error sending welcome email`, error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
});
exports.sendWelcomeEmail = sendWelcomeEmail;
const sendPasswordResetEmail = (email, resetURL) => __awaiter(void 0, void 0, void 0, function* () {
    const recipient = [{ email }];
    try {
        const response = yield mailtrap_config_1.mailtrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            subject: "Reset your password",
            html: emailTemplates_1.PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset",
        });
    }
    catch (error) {
        console.error(`Error sending password reset email`, error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
const sendResetSuccessEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const recipient = [{ email }];
    try {
        const response = yield mailtrap_config_1.mailtrapClient.send({
            from: mailtrap_config_1.sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: emailTemplates_1.PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset",
        });
        console.log("Password reset email sent successfully", response);
    }
    catch (error) {
        console.error(`Error sending password reset success email`, error);
        throw new Error(`Error sending password reset success email: ${error}`);
    }
});
exports.sendResetSuccessEmail = sendResetSuccessEmail;
