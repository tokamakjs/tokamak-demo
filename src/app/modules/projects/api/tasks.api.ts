import { delay } from '@tokamakjs/common';
import { Injectable } from '@tokamakjs/injection';
import { v4 } from 'uuid';

import { NotFoundError } from '~/app/errors/not-found.error';

import { Task } from './models/task';

const fakeTasks = [
  { id: v4(), title: 'This is a test task', projectId: '1', done: false },
  { id: v4(), title: 'This is a test task', projectId: '2', done: false },
];

@Injectable()
export class TasksApi {
  public async fetchTasksForProject(projectId: string): Promise<Array<Task>> {
    await delay(1000);
    return fakeTasks.filter((t) => t.projectId === projectId).map(Task.fromJson);
  }

  public async createTask(projectId: string, title: string): Promise<Task> {
    await delay(1000);
    const newTask = { id: v4(), title, projectId, done: false };
    fakeTasks.push(newTask);
    return Task.fromJson(newTask);
  }

  public async updateTask(taskId: string, data: Partial<Task>): Promise<Task> {
    await delay(1000);
    const task = fakeTasks.find((t) => t.id === taskId);

    if (task == null) {
      throw new NotFoundError();
    }

    const index = fakeTasks.findIndex((t) => t.id === taskId);
    const updatedTask = { ...task, ...data };
    fakeTasks.splice(index, 1, updatedTask);
    return updatedTask;
  }
}
