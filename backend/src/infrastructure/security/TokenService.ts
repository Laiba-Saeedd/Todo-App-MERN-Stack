import jwt from "jsonwebtoken";

export class TokenService {
  generate(payload: object): string {
    return jwt.sign(payload, "SECRET_KEY");
  }
   verify(token: string) {
    return jwt.verify(token,"SECRET_KEY");
  }
}
