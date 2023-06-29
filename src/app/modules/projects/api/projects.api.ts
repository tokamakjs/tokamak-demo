import { AuthError, delay } from '@tokamakjs/common';
import { Injectable } from '@tokamakjs/injection';

import { NotFoundError } from '~/app/errors/not-found.error';

import { Token } from '../../auth/api/models/token';
import { Project } from './models/project';

const fakeProjects = [
  {
    id: '1',
    title: 'Foo project',
  },
  {
    id: '2',
    title: 'Bar project',
  },
];

@Injectable()
export class ProjectsApi {
  public async createProject(title: string): Promise<Project> {
    await delay(500);

    if (Token.getToken() == null) {
      throw new AuthError();
    }

    const p = Project.fromJson({ id: (fakeProjects.length + 1).toString(), title, tasks: [] });
    fakeProjects.push(p);
    return p;
  }

  public async fetchAll(): Promise<Array<Project>> {
    await delay(500);

    if (Token.getToken() == null) {
      throw new AuthError();
    }

    const projects = fakeProjects;
    return projects.map((p) => Project.fromJson(p));
  }

  public async fetchProject(id: string): Promise<Project> {
    await delay(500);

    if (Token.getToken() == null) {
      throw new AuthError();
    }

    const project = fakeProjects.find((p) => p.id === id);

    if (project == null) {
      throw new NotFoundError();
    }

    return Project.fromJson(project);
  }
}
