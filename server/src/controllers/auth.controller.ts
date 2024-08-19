import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import { User } from"@prisma/client";

import bcryptjs from "bcryptjs";
import crypto from "crypto";

import {
  generateVerificationToken,
  verificationTokenExpiresAt,
} from "../utils";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";

import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mailtrap/emails";

const prisma = new PrismaClient();

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required!",
      });
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const verificationToken = generateVerificationToken();
    const verificationExpires = verificationTokenExpiresAt();

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        verificationToken,
        verificationTokenExpiresAt: verificationExpires,
      },
    });

    generateTokenAndSetCookie(res, user.id);

    sendVerificationEmail(user.email, verificationToken);

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
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const { token } = req.body;

  try {
    const user = await prisma.user.findFirst({
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

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiresAt: null,
      },
    });

    await sendWelcomeEmail(user.email, user.name);

    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
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

    const isPasswordValid = await bcryptjs.compare(
      password,
      user.hashedPassword
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    generateTokenAndSetCookie(res, user.id);

    user.lastLogin = new Date();
    await prisma.user.update({
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
  } catch (error: any) {
    console.log("Error logging in", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  // All I have to do is to clear the cookie
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({
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

    const resetPasswordToken = crypto.randomBytes(20).toString("hex");
    const resetPasswordTokenExpiresAt = new Date(
      Date.now() + 1 * 60 * 60 * 1000
    );

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        resetPasswordToken,
        resetPasswordTokenExpiresAt,
      },
    });

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetPasswordToken}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email successfully",
    });
  } catch (error: any) {
    console.error("Error in forgot password ", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await prisma.user.findFirst({
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

    const hashedPassword = await bcryptjs.hash(password, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        hashedPassword,
        resetPasswordToken: null,
        resetPasswordTokenExpiresAt: null,
      },
    });

    await sendResetSuccessEmail(user.email);

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const checkAuth = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: req.user?.id,
      }
    })
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      user: { name: user.name, email: user.email, id: user.id },
    });
  } catch (error: any) {
    console.error("Error in check auth", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
