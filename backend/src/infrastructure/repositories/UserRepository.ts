import { IUserRepository } from "../../application/interfaces/IUserRepository";
import { db } from "../db/mysql";

export class UserRepository implements IUserRepository {
  async create(user: { email: string; password: string }): Promise<void> {
    await db.query("INSERT INTO users (email, password) VALUES (?, ?)", [
      user.email,
      user.password,
    ]);
  }

  async findByEmail(email: string): Promise<{ id: number; email: string; password: string } | null> {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]) as any[];
    return rows[0] || null;
  }
}
