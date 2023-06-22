import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@tokamakjs/react';
import { produce } from 'immer';

import { Task } from '../api/models/task';

export interface TasksState {
  tasks: Array<Task>;
}

function _getInitialState(): TasksState {
  return { tasks: [] };
}

@Injectable()
@StoreConfig({ name: 'tasks', resettable: true, producerFn: produce })
export class TasksStore extends Store<TasksState> {
  constructor() {
    super(_getInitialState());
  }

  public addTask(task: Task): Task {
    this.update((state) => {
      const index = state.tasks.findIndex((t) => t.id === task.id);

      if (index >= 0) {
        state.tasks[index] = task;
      } else {
        state.tasks.push(task);
      }
    });

    return task;
  }

  public addTasks(tasks: Array<Task>): Array<Task> {
    this.update((state) => {
      for (const task of tasks) {
        const index = state.tasks.findIndex((t) => t.id === task.id);

        if (index >= 0) {
          state.tasks[index] = task;
        } else {
          state.tasks.push(task);
        }
      }
    });

    return this.getValue().tasks;
  }

  public updateTask(id: string, task: Task): Task {
    this.update((state) => {
      const index = state.tasks.findIndex((t) => t.id === id);

      if (index >= 0) {
        state.tasks[index] = task;
      }
    });

    return task;
  }
}
