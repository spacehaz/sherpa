/**
 * requests.controller.ts
 * Handles HTTP routes for users handling.
 *
 * Routes:
 *   GET /api/requests — public, accepts query params (GetRequestsQueryDto)
 *   GET /api/requests/:id — public
 *   POST /api/requests — protected, gets userId from @CurrentUser()
 *   PATCH /api/requests/:id — protected, gets userId from @CurrentUser()
 *   DELETE /api/requests/:id — protected, gets userId from @CurrentUser()
 */

import { Controller, Get, Body, Patch, Post, UseGuards, Query, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RequestsService } from './requests.service';
import { UpdateRequestDto } from './dto/update-request.dto';
import { CreateRequestDto } from './dto/create-request.dto';
import { GetRequestsQueryDto } from './dto/get-requests-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser, AuthUser } from '../auth/decorators/current-user.decorator';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Get()
  getOffers(@Query() params: GetRequestsQueryDto) {
    return this.requestsService.findAll(params);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  getMyRequests(@CurrentUser() user: AuthUser, @Query() params: GetRequestsQueryDto) {
    return this.requestsService.findAllByUser(user.id, params);
  }

  @Get('/:id')
  getOffer(@Param('id') id: string) {
    return this.requestsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', { limits: { fileSize: 5 * 1024 * 1024 } }))
  createOffer(
    @CurrentUser() user: AuthUser,
    @Body() requestData: CreateRequestDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.requestsService.create(user.id, requestData, file);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  updateOffer(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() requestData: UpdateRequestDto) {
    return this.requestsService.update(user.id, id, requestData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  deleteOffer(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.requestsService.delete(user.id, id);
  }
}
