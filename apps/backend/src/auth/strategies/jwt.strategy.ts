/**
 * jwt.strategy.ts
 * Passport strategy that validates JWT tokens on protected routes.
 * Extracts the token from the Authorization header (Bearer <token>),
 * verifies the signature using JWT_SECRET, and attaches the payload to request.user.
 */

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

interface JwtPayload {
  sub: string;   // userId — 'sub' is the standard JWT field for subject (who the token belongs to)
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      // Extract token from Authorization: Bearer <token> header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // Reject tokens that have passed their expiry date
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  // Called automatically after the token signature is verified
  // The return value is attached to request.user
  validate(payload: JwtPayload) {
    return { id: payload.sub, email: payload.email };
  }
}
