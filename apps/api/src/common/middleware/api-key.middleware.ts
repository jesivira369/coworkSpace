import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const apiKey = req.headers['x-api-key'];
    const validKey = process.env.API_KEY;

    if (!apiKey || apiKey !== validKey) {
      throw new UnauthorizedException('API key inválida o faltante');
    }

    next();
  }
}
