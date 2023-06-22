import { createRedirection, createRoute, includeRoutes, SubApp } from '@tokamakjs/react';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { RootController } from './routes/root/root.controller';

@SubApp({
  routing: [
    createRedirection('/', '/projects'),
    createRoute('/', RootController, [
      includeRoutes('/projects', ProjectsModule),
      includeRoutes('/auth', AuthModule),
    ]),
  ],
  imports: [ProjectsModule, AuthModule],
  providers: [],
  exports: [],
})
export class AppModule {}
