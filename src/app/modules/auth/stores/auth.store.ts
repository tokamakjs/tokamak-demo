import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@tokamakjs/react';
import { produce } from 'immer';

import { Token } from '../api/models/token';

export interface AuthState {
  authToken?: Token;
}

function _getInitialState(): AuthState {
  return {
    authToken: Token.getToken(),
  };
}

@StoreConfig({ name: 'auth', resettable: true, producerFn: produce })
@Injectable()
export class AuthStore extends Store<AuthState> {
  constructor() {
    super(_getInitialState());
  }

  public setAuthToken(authToken: Token): void {
    this.update((state) => {
      state.authToken = authToken;
      Token.saveToken(authToken);
    });
  }

  public deleteAuthToken(): void {
    this.update((state) => {
      state.authToken = undefined;
      Token.clearToken();
    });
  }
}
