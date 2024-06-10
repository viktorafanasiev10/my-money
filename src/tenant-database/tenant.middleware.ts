// src/middleware/tenant.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      const decodedToken = this.jwtService.decode(token) as any;
      if (decodedToken && decodedToken.activeHousehold) {
        req['tenantId'] = decodedToken.activeHousehold;
      }
    }
    next();
  }
}
