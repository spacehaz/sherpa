/**
 * offers.controller.ts
 * Handles HTTP routes for users handling.
 *
 * Routes:
 *   GET /api/offers — public, accepts query params (GetOffersQueryDto)
 *   GET /api/offers/:id — public
 *   POST /api/offers — protected, gets userId from @CurrentUser()
 *   PATCH /api/offers/:id — protected, gets userId from @CurrentUser()
 *   DELETE /api/offers/:id — protected, gets userId from @CurrentUser()
 */

import { Controller, Get, Body, Patch, Post, UseGuards, Query, Param, Delete } from '@nestjs/common';
import { OffersService } from './offers.service';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { CreateOfferDto } from './dto/create-offer.dto';
import { GetOffersQueryDto } from './dto/get-offers-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, AuthUser } from '../auth/decorators/current-user.decorator';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Get()
  getOffers(@Query() params: GetOffersQueryDto) {
    return this.offersService.findAll(params);
  }

  @Get('/:id')
  getOffer(@Param('id') id: string) {
    return this.offersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createOffer(@CurrentUser() user: AuthUser, @Body() offerData: CreateOfferDto) {
    return this.offersService.create(user.id, offerData);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateOffer(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() offerData: UpdateOfferDto) {
    return this.offersService.update(user.id, id, offerData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteOffer(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.offersService.delete(user.id, id);
  }
}
