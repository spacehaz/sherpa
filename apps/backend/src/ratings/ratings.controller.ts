/**
 * ratings.controller.ts
 * Handles HTTP routes for users handling.
 *
 * Routes:
  POST /ratings       — protected, submit a rating for a completed deal
  GET  /ratings/user/:userId — public, get all ratings for a user
 */

import { Controller, Get, Body, Post, UseGuards, Query, Param } from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto'
import { GetRatingByUserQueryDto } from './dto/get-rating-by-user-query'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { CurrentUser, AuthUser } from '../auth/decorators/current-user.decorator'

@Controller('ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Get('/user/:userId')
  getRating(@Param('userId') userId: string, @Query() params: GetRatingByUserQueryDto) {
    return this.ratingsService.getUserRatings(userId, params);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createRating(@CurrentUser() user: AuthUser, @Body() ratingData: CreateRatingDto) {
    return this.ratingsService.create(user.id, ratingData);
  }
}
