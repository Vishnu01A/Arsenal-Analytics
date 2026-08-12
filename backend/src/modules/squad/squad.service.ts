import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FootballApiClient } from '../football-api/football-api.client';
import { SquadPlayer } from './entities/squad-player.entity';
import { SquadApiResponse } from './dto/squad-api-response.dto';

@Injectable()
export class SquadService {
  constructor(
    @InjectRepository(SquadPlayer)
    private readonly squadPlayerRepository: Repository<SquadPlayer>,
    private readonly footballApiClient: FootballApiClient,
  ) {}

  async seedFromApi(season: string): Promise<SquadPlayer[]> {
    const response =
      await this.footballApiClient.get<SquadApiResponse>('/teams/57');

    const players = response.squad.map((player) => ({
      season,
      playerId: player.id,
      name: player.name,
      position: player.position,
      nationality: player.nationality,
      dateOfBirth: player.dateOfBirth,
      shirtNumber: null, // not provided by football-data.org; re-seeding will overwrite any manually-set value
    }));

    await this.squadPlayerRepository.upsert(players, ['season', 'playerId']);
    return this.findBySeason(season);
  }

  async findBySeason(season: string): Promise<SquadPlayer[]> {
    return this.squadPlayerRepository.find({
      where: { season },
      order: { name: 'ASC' },
    });
  }
}
