import { SubApp, createRedirection, createRoute, includeRoutes } from '@tokamakjs/react';

import { AuthModule } from './modules/auth/auth.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ReactQueryModule } from './modules/react-query/react-query.module';
import { RootController } from './routes/root/root.controller';

@SubApp({
  routing: [
    createRedirection('/', '/projects'),
    createRoute('/', RootController, [
      includeRoutes('/projects', ProjectsModule),
      includeRoutes('/auth', AuthModule),
      includeRoutes('/react-query', ReactQueryModule),
    ]),
  ],
  imports: [ProjectsModule, AuthModule, ReactQueryModule],
  providers: [],
  exports: [],
})
export class AppModule {}
