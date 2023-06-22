import { RouterService } from '@tokamakjs/common';
import { Controller } from '@tokamakjs/react';

import { Token } from '../../api/models/token';
import { AuthService } from '../../services/auth.service';
import { LoginView } from './login.view';

@Controller({ view: LoginView })
export class LoginController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _router: RouterService,
  ) {}

  public async login(email: string, password: string): Promise<Token> {
    const token = await this._authService.login(email, password);
    this._router.push('/');
    return token;
  }
}
