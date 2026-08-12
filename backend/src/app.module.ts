import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { z } from 'zod';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './modules/players/players.module';
import { StandingsModule } from './modules/standings/standings.module';
import { SquadModule } from './modules/squad/squad.module';

const envSchema = z.object({
  DATABASE_HOST: z.string().min(1),
  DATABASE_PORT: z.coerce.number().default(5432),
  DATABASE_USER: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_NAME: z.string().min(1),
  FOOTBALL_API_BASE_URL: z.string().url(),
  FOOTBALL_API_KEY: z.string().min(1),
  FOOTBALL_API_TIMEOUT_MS: z.coerce.number().default(5000),
  FOOTBALL_API_SEASON: z.string().default('2024'),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => envSchema.parse(config),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: false, // Keeps our manual DBeaver schemas as the absolute source of truth
      }),
    }),
    PlayersModule,
    StandingsModule,
    SquadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
