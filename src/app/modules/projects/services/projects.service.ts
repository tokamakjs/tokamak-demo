import { Query } from '@datorama/akita';
import { Injectable } from '@tokamakjs/react';

import { Project } from '../api/models/project';
import { Task } from '../api/models/task';
import { ProjectsApi } from '../api/projects.api';
import { ProjectsState, ProjectsStore } from '../stores/projects.store';

@Injectable()
export class ProjectsService extends Query<ProjectsState> {
  public readonly projects$ = this.select('projects');

  constructor(
    protected readonly _store: ProjectsStore,
    private readonly _projectsApi: ProjectsApi,
  ) {
    super(_store);
  }

  public async loadProjects(): Promise<Array<Project>> {
    const projects = await this._projectsApi.fetchAll();
    return this._store.addProjects(projects);
  }

  public async addProject(title: string): Promise<Project> {
    const project = await this._projectsApi.createProject(title);
    return this._store.addProject(project);
  }

  public async loadProject(id: string): Promise<Project> {
    const project = await this._projectsApi.fetchProject(id);
    return this._store.addProject(project);
  }
}
