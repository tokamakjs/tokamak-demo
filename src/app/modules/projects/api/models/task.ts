import { ze } from '@tokamakjs/common';
import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  projectId: z.string(),
  done: z.boolean(),
});

export class Task extends ze.ClassFrom(TaskSchema) {
  public static fromJson(json: unknown): Task {
    return ze.validate(Task, json);
  }
}
