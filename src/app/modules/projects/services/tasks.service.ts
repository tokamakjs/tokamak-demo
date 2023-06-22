import { Query } from '@datorama/akita';
import { Injectable } from '@tokamakjs/injection';

import { Task } from '../api/models/task';
import { TasksApi } from '../api/tasks.api';
import { TasksState, TasksStore } from '../stores/tasks.store';

@Injectable()
export class TasksService extends Query<TasksState> {
  public readonly tasks$ = this.select('tasks');

  constructor(protected readonly _store: TasksStore, private readonly _tasksApi: TasksApi) {
    super(_store);
  }
  public async loadTasksForProject(projectId: string): Promise<Array<Task>> {
    const tasks = await this._tasksApi.fetchTasksForProject(projectId);
    return this._store.addTasks(tasks);
  }

  public async addTaskToProject(projectId: string, title: string): Promise<Task> {
    const task = await this._tasksApi.createTask(projectId, title);
    return this._store.addTask(task);
  }

  public async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const task = await this._tasksApi.updateTask(id, data);
    return this._store.updateTask(task.id, task);
  }
}
