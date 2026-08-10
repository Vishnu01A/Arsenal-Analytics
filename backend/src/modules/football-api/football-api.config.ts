import { ConfigService } from '@nestjs/config';

export interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  timeoutMs: number;
  season: string;
}

export function buildApiConfig(configService: ConfigService): ApiConfig {
  return {
    baseUrl: configService.get<string>('FOOTBALL_API_BASE_URL')!,
    apiKey: configService.get<string>('FOOTBALL_API_KEY')!,
    timeoutMs: configService.get<number>('FOOTBALL_API_TIMEOUT_MS', 5000),
    season: configService.get<string>('FOOTBALL_API_SEASON', '2024'),
  };
}
