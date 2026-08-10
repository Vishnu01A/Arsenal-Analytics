import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StandingsService } from './standings.service';
import { StandingsController } from './standings.controller';
import { Standing } from './entities/standing.entity';
import { FootballApiModule } from '../football-api/football-api.module';

@Module({
  imports: [TypeOrmModule.forFeature([Standing]), FootballApiModule],
  controllers: [StandingsController],
  providers: [StandingsService],
})
export class StandingsModule {}
