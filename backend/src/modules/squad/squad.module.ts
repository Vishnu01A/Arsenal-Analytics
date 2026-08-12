import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SquadService } from './squad.service';
import { SquadController } from './squad.controller';
import { SquadPlayer } from './entities/squad-player.entity';
import { FootballApiModule } from '../football-api/football-api.module';

@Module({
  imports: [TypeOrmModule.forFeature([SquadPlayer]), FootballApiModule],
  controllers: [SquadController],
  providers: [SquadService],
})
export class SquadModule {}
