import { Injectable } from '@tokamakjs/injection';
import { z } from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z.union([z.literal('development'), z.literal('production')]),
});

type Env = z.infer<typeof EnvSchema>;

@Injectable()
export class ConfigService {
  private readonly _env: Env;

  constructor() {
    this._env = EnvSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
    });
  }

  public get<K extends keyof Env>(key: K): Env[K] {
    return this._env[key];
  }
}
