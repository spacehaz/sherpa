/**
 * auth.module.ts
 * Wires together all auth-related pieces and configures JWT signing.
 *
 * controllers — registers HTTP routes
 * providers   — registers AuthService and AuthRepository for DI
 * JwtModule   — configures JWT signing with secret from .env
 */

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './auth.repository';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    // PassportModule registers Passport.js with NestJS
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],  // makes ConfigService available inside the factory
      inject: [ConfigService],  // tells NestJS to pass ConfigService as factory argument
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, JwtStrategy, JwtAuthGuard],
  // Export guard and JWT module so other modules can use them
  exports: [JwtAuthGuard, JwtModule],
})
export class AuthModule {}
