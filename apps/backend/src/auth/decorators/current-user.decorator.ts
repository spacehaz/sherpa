/**
 * current-user.decorator.ts
 * Custom parameter decorator that extracts the logged-in user from the request.
 * request.user is populated by JwtStrategy.validate() after token verification.
 * NestJS uses ExecutionContext as a protocol-agnostic wrapper over the request
 * (HTTP, WebSocket, gRPC) — switchToHttp() tells it we want the HTTP request specifically.
 *
 * Usage in controllers:
 *   @UseGuards(JwtAuthGuard)
 *   @Get('me')
 *   getMe(@CurrentUser() user: AuthUser) { ... }
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface AuthUser {
  id: string;
  email: string;
}

export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AuthUser => {
    // switchToHttp() — we're in HTTP context (not WebSocket/gRPC)
    // getRequest() — returns the Express request object
    const request = ctx.switchToHttp().getRequest();
    return request.user; // populated by JwtStrategy.validate()
  },
);
