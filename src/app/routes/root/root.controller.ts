import { Controller } from '@tokamakjs/react';

import { NotFoundErrorHandler } from '~/app/handlers/not-found-error.handler';
import { AuthErrorHandler } from '~/app/modules/auth/handlers/auth-error.handler';

import { RootView } from './root.view';

@Controller({ view: RootView, handlers: [AuthErrorHandler, NotFoundErrorHandler] })
export class RootController {}
