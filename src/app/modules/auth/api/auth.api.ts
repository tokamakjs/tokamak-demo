import { AuthError, ze } from '@tokamakjs/common';
import { Injectable } from '@tokamakjs/react';
import { ConfigService } from '../../config/services/config.service';

import { Token } from './models/token';

@Injectable()
export class AuthApi {
  constructor(private readonly _config: ConfigService) {}

  public async login(email: string, password: string): Promise<Token> {
    if (this._config.get('NODE_ENV') === 'production') {
      throw new Error('This app is not ready for production.');
    }

    if (email !== 'lars.ruiz@clipboardhealth.com' || password !== 'asdf1234') {
      throw new AuthError();
    }

    return ze.validate(Token, { value: 'auth-token-value' });
  }
}
