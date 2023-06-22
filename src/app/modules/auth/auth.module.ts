import { RouterModule, SubApp, createRoute } from '@tokamakjs/react';

import { ConfigModule } from '../config/config.module';
import { AuthApi } from './api/auth.api';
import { LoginController } from './routes/login/login.controller';
import { AuthService } from './services/auth.service';
import { AuthStore } from './stores/auth.store';

@SubApp({
  routing: [createRoute('/login', LoginController)],
  imports: [ConfigModule, RouterModule],
  providers: [AuthService, AuthStore, AuthApi],
  exports: [AuthService],
})
export class AuthModule {}
