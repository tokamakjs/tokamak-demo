import { AuthError, Guard } from '@tokamakjs/common';
import { Injectable } from '@tokamakjs/react';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements Guard {
  constructor(private readonly _authService: AuthService) {}

  public async canActivate(): Promise<boolean> {
    return this._authService.getCurrentAuthToken() != null;
  }

  public didNotActivate(): void {
    throw new AuthError();
  }
}
