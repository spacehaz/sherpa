/**
 * auth.controller.ts
 * Handles HTTP routes for authentication.
 * Delegates all logic to AuthService — no business logic here.
 *
 * Routes:
 *   POST /api/auth/register
 *   POST /api/auth/login
 */

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    // ValidationPipe validates dto automatically before this runs
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
