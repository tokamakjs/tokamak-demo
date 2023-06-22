import { SubApp, createRoute } from '@tokamakjs/react';

import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ConfigModule } from '../config/config.module';
import { ProjectsApi } from './api/projects.api';
import { TasksApi } from './api/tasks.api';
import { ProjectController } from './routes/project/project.controller';
import { ProjectsController } from './routes/projects/projects.controller';
import { ProjectsService } from './services/projects.service';
import { TasksService } from './services/tasks.service';
import { ProjectsStore } from './stores/projects.store';
import { TasksStore } from './stores/tasks.store';

@SubApp({
  routing: [createRoute('/', ProjectsController), createRoute('/:id', ProjectController)],
  imports: [ConfigModule, AuthModule],
  providers: [
    ProjectsService,
    AuthGuard,
    ProjectsStore,
    ProjectsApi,
    TasksApi,
    TasksService,
    TasksStore,
  ],
})
export class ProjectsModule {}
