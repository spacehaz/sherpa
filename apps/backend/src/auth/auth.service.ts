/**
 * auth.service.ts
 * Business logic for authentication.
 * Handles password hashing, validation, and JWT token generation.
 * Delegates DB queries to AuthRepository.
 */

import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    // JwtService is provided by @nestjs/jwt — signs and verifies tokens
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // Check if email is already taken
    const existing = await this.authRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    // Hash the password before storing — bcrypt adds a salt automatically
    // 10 = salt rounds (higher = slower hash = harder to brute force)
    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.authRepository.create({
      email: dto.email,
      passwordHash,
      name: dto.name,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      ...this.signToken(user.id, user.email),
    };

  }

  async login(dto: LoginDto) {
    const user = await this.authRepository.findByEmail(dto.email);
    if (!user) {
      // Intentionally vague — don't reveal whether the email exists
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare the incoming password against the stored hash
    const isPasswordValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      ...this.signToken(user.id, user.email),
    };
  }

  private signToken(userId: string, email: string) {
    // Payload embedded in the JWT — readable by anyone, so never put sensitive data here
    const payload = { sub: userId, email };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
