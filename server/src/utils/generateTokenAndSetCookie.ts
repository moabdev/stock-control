import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res: Response, userId: string) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
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
