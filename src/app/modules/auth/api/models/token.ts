import { ze } from '@tokamakjs/common';
import { z } from 'zod';

const AUTH_TOKEN_LS_KEY = 'AUTH_TOKEN_LOCAL_STORAGE_KEY';

const TokenSchema = z.object({
  value: z.string(),
});

export class Token extends ze.ClassFrom(TokenSchema) {
  public static saveToken(token: Token): void {
    localStorage.setItem(AUTH_TOKEN_LS_KEY, JSON.stringify(token));
  }

  public static getToken(): Token | undefined {
    const data = JSON.parse(localStorage.getItem(AUTH_TOKEN_LS_KEY) ?? 'null') ?? undefined;
    try {
      return ze.validate(Token, data);
    } catch {
      return undefined;
    }
  }

  public static clearToken(): void {
    localStorage.removeItem(AUTH_TOKEN_LS_KEY);
  }

  public override toString(): string {
    return this.value;
  }
}
