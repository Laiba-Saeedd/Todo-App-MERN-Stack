// src/application/usecases/RegisterUser.ts
import { IUserRepository } from "../interfaces/IUserRepository";
import { User } from "../entities/User";
import { Hasher } from "../../infrastructure/security/Hasher";

export class RegisterUser {
  constructor(
    private userRepo: IUserRepository,
    private hasher: Hasher
  ) {}

  async execute(email: string, password: string): Promise<void> {
    // --- Business rules validation ---
    if (!email || !password) throw new Error("Email and password are required");
    email = email.trim().toLowerCase();
    if (password.length < 6) throw new Error("Password must be at least 6 characters");

    // --- Check if user already exists ---
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) throw new Error("Email already registered");

    // --- Hash password and create user ---
    const hashedPassword = await this.hasher.hash(password);
    const user = new User(email, hashedPassword);
    await this.userRepo.create(user);
  }
}
