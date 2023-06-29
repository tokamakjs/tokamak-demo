import { Controller } from '@tokamakjs/react';

import { RepoDataService } from '../../services/repo-data.service';
import { ExampleView } from './example.view';

@Controller({ view: ExampleView })
export class ExampleController {
  get data() {
    return this._repoDataService.data;
  }

  get isLoading() {
    return this._repoDataService.isLoading;
  }

  get error() {
    return this._repoDataService.error;
  }

  get isFetching() {
    return this._repoDataService.isFetching;
  }

  constructor(private readonly _repoDataService: RepoDataService) {}
}
