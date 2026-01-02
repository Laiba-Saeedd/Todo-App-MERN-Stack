// src/presentation/controllers/AuthController.ts
import { Request, Response } from "express";
import { RegisterUser } from "../../application/usecases/RegisterUser";
import { LoginUser } from "../../application/usecases/LoginUser";
import { IUserRepository } from "../../application/interfaces/IUserRepository";
import { UserRepository } from "../../infrastructure/repositories/UserRepository";
import { Hasher } from "../../infrastructure/security/Hasher";
import { TokenService } from "../../infrastructure/security/TokenService";

const userRepo: IUserRepository = new UserRepository();
const hasher = new Hasher();
const tokenService = new TokenService();

export class AuthController {
  // --- Register ---
  static async register(req: Request, res: Response) {
    const { email, password } = req.body;

    // --- Controller-level validation ---
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    try {
      const usecase = new RegisterUser(userRepo, hasher);
      await usecase.execute(email, password);
      res.status(201).json({ message: "User registered successfully" });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  // --- Login ---
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // --- Controller-level validation ---
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    try {
      const usecase = new LoginUser(userRepo, hasher, tokenService);
      const token = await usecase.execute(email, password);
      res.json({ token });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
