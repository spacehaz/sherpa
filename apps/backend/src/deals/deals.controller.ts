/**
 * deals.controller.ts
 * Handles HTTP routes for users handling.
 *
 * Routes:
  POST   /deals                — protected, create a deal
  GET    /deals/my             — protected, deals where user is initiator or responder
  GET    /deals/:id            — protected, only participants
  DELETE    /deals/:id         — protected, only participants
  PATCH  /deals/:id/status     — protected, update deal status
  POST   /deals/:id/messages   — protected, send a message
  GET    /deals/:id/messages   — protected, get message thread
 */

import { Controller, Get, Body, Patch, Post, Delete, UseGuards, Query, Param } from '@nestjs/common';
import { DealsService } from './deals.service';
import { UpdateDealStatusDto } from './dto/update-deal-status.dto';
import { CreateDealDto } from './dto/create-deal.dto';
import { GetMyDealsQueryDto } from './dto/get-my-deals-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, AuthUser } from '../auth/decorators/current-user.decorator';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMyDealMessagesQueryDto } from './dto/get-my-deal-messages-query.dto';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  getDeals(@CurrentUser() user: AuthUser, @Query() params: GetMyDealsQueryDto) {
    return this.dealsService.findMyDeals(user.id, params);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  getDeal(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.dealsService.findById(user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createDeal(@CurrentUser() user: AuthUser, @Body() dealData: CreateDealDto) {
    return this.dealsService.createDeal(user.id, dealData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteDeal(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.dealsService.deleteDeal(user.id, id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id/status')
  updateDeal(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dealData: UpdateDealStatusDto) {
    return this.dealsService.updateDealStatus(user.id, id, dealData);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:id/messages')
  createDealMessage(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dealMessageData: CreateMessageDto) {
    return this.dealsService.createMessage(user.id, id, dealMessageData);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id/messages')
  getDealMessages(@CurrentUser() user: AuthUser, @Param('id') id: string, @Query() params: GetMyDealMessagesQueryDto) {
    return this.dealsService.findMessages(user.id, id, params);
  }
}
