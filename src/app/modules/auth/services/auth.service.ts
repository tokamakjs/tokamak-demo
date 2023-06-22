import { Query } from '@datorama/akita';
import { Injectable } from '@tokamakjs/react';
import { AuthApi } from '../api/auth.api';

import { Token } from '../api/models/token';
import { AuthState, AuthStore } from '../stores/auth.store';

@Injectable()
export class AuthService extends Query<AuthState> {
  public readonly authToken$ = this.select('authToken');

  constructor(protected readonly _store: AuthStore, private readonly _api: AuthApi) {
    super(_store);
  }

  public async login(email: string, password: string): Promise<Token> {
    const authToken = await this._api.login(email, password);
    this._store.setAuthToken(authToken);
    return authToken;
  }

  public async logout(): Promise<void> {
    this._store.deleteAuthToken();
  }

  public getCurrentAuthToken(): Token | undefined {
    return this.getValue().authToken;
  }
}
