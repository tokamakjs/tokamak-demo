import { ze } from '@tokamakjs/common';
import { HookService } from '@tokamakjs/react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { z } from 'zod';

const RepoDataSchema = z.object({
  name: z.string(),
  description: z.string(),
  subscribers_count: z.number(),
  stargazers_count: z.number(),
  forks_count: z.number(),
});

class RepoData extends ze.ClassFrom(RepoDataSchema) {
  public static fromJson(json: unknown): RepoData {
    return ze.validate(RepoData, json);
  }
}

@HookService()
export class RepoDataService {
  private _query = useQuery('repoData', async () => {
    const { data } = await axios.get('https://api.github.com/repos/tannerlinsley/react-query');
    return RepoData.fromJson(data);
  });

  get isLoading() {
    return this._query.isLoading;
  }

  get error() {
    return this._query.error as Error;
  }

  get isFetching() {
    return this._query.isFetching;
  }

  get data() {
    return this._query.data;
  }
}
