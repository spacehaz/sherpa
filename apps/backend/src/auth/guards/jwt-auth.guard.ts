/**
 * jwt-auth.guard.ts
 * Guard that protects routes by requiring a valid JWT token.
 * Apply with @UseGuards(JwtAuthGuard) on any controller or route handler.
 * Triggers JwtStrategy which extracts, verifies the token and populates request.user.
 */

import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
// 'jwt' refers to the strategy name — PassportStrategy(Strategy) defaults to 'jwt'
