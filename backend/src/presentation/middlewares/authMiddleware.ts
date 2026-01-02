import { Request, Response, NextFunction } from "express";
import { TokenService } from "../../infrastructure/security/TokenService";

const tokenService = new TokenService();

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = tokenService.verify(token) as { userId: number }; 
    (req as any).userId = decoded.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
