import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import type { ApiConfig } from './football-api.config';

export class FootballApiException extends HttpException {
  constructor(status: number, body: unknown) {
    super(
      { message: 'Football API error', upstreamStatus: status, body },
      HttpStatus.BAD_GATEWAY,
    );
  }
}

@Injectable()
export class FootballApiClient {
  constructor(private readonly config: ApiConfig) {}

  async get<T>(path: string, params?: Record<string, string>): Promise<T> {
    const base = this.config.baseUrl.endsWith('/')
      ? this.config.baseUrl
      : `${this.config.baseUrl}/`;
    const url = new URL(path.replace(/^\//, ''), base);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
    }

    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      this.config.timeoutMs,
    );

    let response: Response;
    try {
      response = await fetch(url.toString(), {
        headers: { 'X-Auth-Token': this.config.apiKey },
        signal: controller.signal,
      });
    } catch (err) {
      throw new FootballApiException(0, String(err));
    } finally {
      clearTimeout(timeout);
    }

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      throw new FootballApiException(response.status, body);
    }

    return response.json() as Promise<T>;
  }
}
