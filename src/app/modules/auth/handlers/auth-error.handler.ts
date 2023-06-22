import { AuthError, Catch, ErrorHandler, RouterService } from '@tokamakjs/common';

@Catch(AuthError)
export class AuthErrorHandler implements ErrorHandler<AuthError> {
  constructor(private readonly _router: RouterService) {}

  public catch(): void {
    this._router.push('/auth/login');
  }
}
