/**
 * users.controller.ts
 * Handles HTTP routes for users handling.
 *
 * Routes:
 *   GET /api/users/me
 *   PATCH /api/users/me
 */

import { Controller, Get, Body, Patch, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, AuthUser } from '../auth/decorators/current-user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUser(@CurrentUser() user: AuthUser) {
    return this.usersService.getUser(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  updateUser(@CurrentUser() user: AuthUser, @Body() dto: UpdateUserDto) {
    return this.usersService.updateUser(user.id, dto);
  }
}
