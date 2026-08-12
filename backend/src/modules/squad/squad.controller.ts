import { Controller, Get, Post, Query } from '@nestjs/common';
import { SquadService } from './squad.service';

@Controller('squad')
export class SquadController {
  constructor(private readonly squadService: SquadService) {}

  @Get()
  findBySeason(@Query('season') season: string) {
    return this.squadService.findBySeason(season);
  }

  @Post('seed')
  seed(@Query('season') season: string) {
    return this.squadService.seedFromApi(season);
  }
}
