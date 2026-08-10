import { Controller, Get, Post, Query } from '@nestjs/common';
import { StandingsService } from './standings.service';

@Controller('standings')
export class StandingsController {
  constructor(private readonly standingsService: StandingsService) {}

  @Get()
  findBySeason(@Query('season') season: string) {
    return this.standingsService.findBySeason(season);
  }

  @Post('seed')
  seed(@Query('season') season: string) {
    return this.standingsService.seedFromApi(season);
  }
}
