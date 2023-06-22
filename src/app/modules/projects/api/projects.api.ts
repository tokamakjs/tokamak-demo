import { delay } from '@tokamakjs/common';
import { Injectable } from '@tokamakjs/injection';

import { NotFoundError } from '~/app/errors/not-found.error';

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
    await delay(1000);
    return Project.fromJson({ id: (fakeProjects.length + 1).toString(), title, tasks: [] });
  }

  public async fetchAll(): Promise<Array<Project>> {
    await delay(1000);
    const projects = fakeProjects;
    return projects.map((p) => Project.fromJson(p));
  }

  public async fetchProject(id: string): Promise<Project> {
    await delay(1000);
    const project = fakeProjects.find((p) => p.id === id);

    if (project == null) {
      throw new NotFoundError();
    }

    return Project.fromJson(project);
  }
}
