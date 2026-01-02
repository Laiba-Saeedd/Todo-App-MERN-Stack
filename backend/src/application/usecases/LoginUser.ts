// src/application/usecases/LoginUser.ts
import { IUserRepository } from "../interfaces/IUserRepository";
import { Hasher } from "../../infrastructure/security/Hasher";
import { TokenService } from "../../infrastructure/security/TokenService";

export class LoginUser {
  constructor(
    private userRepo: IUserRepository,
    private hasher: Hasher,
    private tokenService: TokenService
  ) {}

  async execute(email: string, password: string): Promise<string> {
    // --- Business rules validation ---
    if (!email || !password) throw new Error("Email and password are required");
    email = email.trim().toLowerCase();

    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error("User not found");

    const valid = await this.hasher.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    // --- Return JWT token ---
    return this.tokenService.generate({ userId: user.id });
  }
}
