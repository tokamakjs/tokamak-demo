import { SubApp, createRoute } from '@tokamakjs/react';

import { ExampleController } from './routes/example/example.controller';
import { RootController } from './routes/root/root.controller';
import { RepoDataService } from './services/repo-data.service';

@SubApp({
  routing: [createRoute('/', RootController, [createRoute('/example', ExampleController)])],
  providers: [RepoDataService],
})
export class ReactQueryModule {}
