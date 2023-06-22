import { RouterService } from '@tokamakjs/common';
import { Controller, onDidMount, state } from '@tokamakjs/react';
import { Subscription } from 'rxjs';

import { AuthGuard } from '~/app/modules/auth/guards/auth.guard';

import { Project } from '../../api/models/project';
import { Task } from '../../api/models/task';
import { ProjectsService } from '../../services/projects.service';
import { TasksService } from '../../services/tasks.service';
import { ProjectView } from './project.view';

@Controller({ view: ProjectView, guards: [AuthGuard] })
export class ProjectController {
  @state private _project?: Project;
  @state private _tasks = [] as Array<Task>;
  @state private _isLoading = true;

  get project() {
    return this._project;
  }

  get isLoading() {
    return this._isLoading;
  }

  get projectId() {
    return this._router.getParams(this).id;
  }

  get tasks() {
    return this._tasks;
  }

  constructor(
    private readonly _projectsService: ProjectsService,
    private readonly _tasksService: TasksService,
    private readonly _router: RouterService,
  ) {}

  @onDidMount()
  public async loadProject(): Promise<void> {
    if (this.projectId == null) {
      return;
    }

    this._isLoading = true;
    await this._projectsService.loadProject(this.projectId);
    await this._tasksService.loadTasksForProject(this.projectId);
    this._isLoading = false;
  }

  @onDidMount()
  public subscribeToServices(): VoidFunction {
    const subs = new Subscription();

    subs.add(
      this._projectsService.projects$.subscribe(
        (v) => (this._project = v.find((p) => p.id == this.projectId)),
      ),
    );

    subs.add(
      this._tasksService.tasks$.subscribe(
        (v) => (this._tasks = v.filter((t) => t.projectId === this.projectId)),
      ),
    );

    return () => {
      subs.unsubscribe();
    };
  }

  public async createTask(title: string): Promise<void> {
    if (this.projectId == null) {
      return;
    }

    await this._tasksService.addTaskToProject(this.projectId, title);
  }

  public async checkTask(id: string): Promise<void> {
    await this._tasksService.updateTask(id, { done: true });
  }

  public async uncheckTask(id: string): Promise<void> {
    await this._tasksService.updateTask(id, { done: false });
  }
}
