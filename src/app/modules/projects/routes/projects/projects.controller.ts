import { RouterService } from '@tokamakjs/common';
import { Controller, onDidMount, state } from '@tokamakjs/react';
import { Subscription } from 'rxjs';

import { AuthGuard } from '~/app/modules/auth/guards/auth.guard';
import { AuthErrorHandler } from '~/app/modules/auth/handlers/auth-error.handler';
import { AuthService } from '~/app/modules/auth/services/auth.service';

import { Project } from '../../api/models/project';
import { ProjectsService } from '../../services/projects.service';
import { ProjectsView } from './projects.view';

@Controller({ view: ProjectsView, guards: [AuthGuard], handlers: [AuthErrorHandler] })
export class ProjectsController {
  @state private _projects = [] as Array<Project>;
  @state private _isLoadingProjects = false;

  get projects() {
    return this._projects;
  }

  get isLoadingProjects() {
    return this._isLoadingProjects;
  }

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: RouterService,
    private readonly _projectsService: ProjectsService,
  ) {}

  @onDidMount()
  public async loadProjects(): Promise<void> {
    this._isLoadingProjects = true;
    await this._projectsService.loadProjects();
    this._isLoadingProjects = false;
  }

  @onDidMount()
  public subscribeToServices(): VoidFunction {
    const subs = new Subscription();

    subs.add(this._projectsService.projects$.subscribe((v) => (this._projects = v)));

    return () => {
      subs.unsubscribe();
    };
  }

  public logout(): void {
    this._authService.logout();
    this._router.push('/auth/login');
  }

  public async createProject(title: string): Promise<void> {
    await this._projectsService.addProject(title);
  }

  public goToProject(p: Project): void {
    this._router.push(`/projects/${p.id}`);
  }
}
