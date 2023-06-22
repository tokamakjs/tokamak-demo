import { ze } from '@tokamakjs/common';
import { z } from 'zod';

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
});

export class Project extends ze.ClassFrom(ProjectSchema) {
  public static fromJson(json: Record<string, unknown>): Project {
    return ze.validate(Project, json);
  }
}
