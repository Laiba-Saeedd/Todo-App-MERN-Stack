import bcrypt from "bcrypt";

export class Hasher {
  hash(password: string) {
    return bcrypt.hash(password, 10);
  }

  compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
