

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
 
// Example User type
interface UserPayload {
  id: string;
  email: string;
  role?: string;
}
 
// Extend req.user by modifying global type in a separate file (shown below)
declare module "express-serve-static-core" {
  interface Request {
    users?: UserPayload;
  }
}
 
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void  => {
  const authHeader = req.headers.authorization;
 
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ message: "Missing or invalid token" });
        return;
  }
 
  const token = authHeader.split(" ")[1];
 
  try {
    const secret = process.env.JWT_SECRET || "your_secret"; // replace with your secret
    const decoded = jwt.verify(token, secret) as UserPayload;
 
    req.users = decoded; // set user on req
    console.log("Decoded token:", decoded);
    console.log("User from token:", req.users);
 
    next();
  } catch (error) {
     res.status(401).json({ message: "Invalid or expired token" });
        return;
  }
};