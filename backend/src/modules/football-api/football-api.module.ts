import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FootballApiClient } from './football-api.client';
import { buildApiConfig } from './football-api.config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: FootballApiClient,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        new FootballApiClient(buildApiConfig(configService)),
    },
  ],
  exports: [FootballApiClient],
})
export class FootballApiModule {}
