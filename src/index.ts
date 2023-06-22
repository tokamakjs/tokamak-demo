import { TokamakApp } from '@tokamakjs/react';
import { AppModule } from './app/app.module';

export async function bootstrap(): Promise<void> {
  const app = await TokamakApp.create(AppModule);

  app.render('#root');
}

bootstrap();
