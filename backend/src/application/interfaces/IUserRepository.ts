export interface IUserRepository {
  create(user: { email: string; password: string }): Promise<void>;
  findByEmail(email: string): Promise<{ id: number; email: string; password: string } | null>;
}
