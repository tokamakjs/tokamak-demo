import { Module } from '@tokamakjs/react';
import { ConfigService } from './services/config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
