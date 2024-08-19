import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserRequest extends Request {
  user?: { id: string };
}

interface DecodedToken extends JwtPayload {
  id: string;
}

export const verifyToken = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;

    if (typeof decoded === "object" && "id" in decoded) {
      req.user = { id: decoded.id };
    } else {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - invalid token" });
    }

    next();
  } catch (error: any) {
    console.error("Error in verifyToken:", error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized - invalid token" });
  }
};
