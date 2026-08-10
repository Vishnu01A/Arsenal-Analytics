import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FootballApiClient } from '../football-api/football-api.client';
import { Standing } from './entities/standing.entity';
import { StandingsApiResponse } from './dto/standings-api-response.dto';

@Injectable()
export class StandingsService {
  constructor(
    @InjectRepository(Standing)
    private readonly standingRepository: Repository<Standing>,
    private readonly footballApiClient: FootballApiClient,
  ) {}

  async seedFromApi(season: string): Promise<Standing[]> {
    const response = await this.footballApiClient.get<StandingsApiResponse>(
      '/competitions/PL/standings',
    );
    const totalTable = response.standings.find((group) => group.type === 'TOTAL');
    const rows = totalTable?.table ?? [];

    const standings = rows.map((row) => ({
      season,
      position: row.position,
      teamId: row.team.id,
      teamName: row.team.name,
      played: row.playedGames,
      won: row.won,
      drawn: row.draw,
      lost: row.lost,
      goalsFor: row.goalsFor,
      goalsAgainst: row.goalsAgainst,
      goalDifference: row.goalDifference,
      points: row.points,
      form: row.form,
    }));

    await this.standingRepository.upsert(standings, ['season', 'teamId']);
    return this.findBySeason(season);
  }

  async findBySeason(season: string): Promise<Standing[]> {
    return this.standingRepository.find({
      where: { season },
      order: { position: 'ASC' },
    });
  }
}
