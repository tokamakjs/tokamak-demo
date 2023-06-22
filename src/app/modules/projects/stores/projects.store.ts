import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@tokamakjs/react';
import { produce } from 'immer';

import { Project } from '../api/models/project';

export interface ProjectsState {
  projects: Array<Project>;
}

function _getInitialState(): ProjectsState {
  return { projects: [] };
}

@Injectable()
@StoreConfig({ name: 'projects', resettable: true, producerFn: produce })
export class ProjectsStore extends Store<ProjectsState> {
  constructor() {
    super(_getInitialState());
  }

  public addProject(project: Project): Project {
    this.update((state) => {
      const index = state.projects.findIndex((p) => p.id === project.id);

      if (index >= 0) {
        state.projects[index] = project;
      } else {
        state.projects.push(project);
      }
    });

    return project;
  }

  public addProjects(projects: Array<Project>): Array<Project> {
    this.update((state) => {
      for (const project of projects) {
        const index = state.projects.findIndex((p) => p.id === project.id);

        if (index >= 0) {
          state.projects[index] = project;
        } else {
          state.projects.push(project);
        }
      }
    });

    return this.getValue().projects;
  }
}
