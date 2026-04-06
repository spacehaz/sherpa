/**
 * ratings.service.ts
 * business logic for ratings
 */

import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { GetRatingByUserQueryDto } from './dto/get-rating-by-user-query';
import { RatingsRepository } from './ratings.repository';
import { DealsRepository } from 'src/deals/deals.repository';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class RatingsService{
  constructor(
    private readonly ratingsRepository: RatingsRepository,
    private readonly dealsRepository: DealsRepository,
    private readonly usersRepository: UsersRepository,
    
  ) {}

  async create(
    userId: string,
    dto: CreateRatingDto
  ) {

    const { dealId, toUserId } = dto

    const deal = await this.dealsRepository.findById(dealId)
    
    if (!deal) {
      throw new NotFoundException('Deal not found')
    }

    const { initiatorId, responderId, status } = deal

    if (status !== 'completed') {
      throw new BadRequestException('Deal is not finished yet')
    }

    if (userId !== initiatorId && userId !== responderId) {
      throw new ForbiddenException('The rating can be created only for participant of the deal')
    }

    if (dto.toUserId === userId) {
      throw new BadRequestException('The rating can be created only for another participant of the deal')
    }


    const alreadyCreated = await this.ratingsRepository.findExisting(dto.dealId, userId)
    if (alreadyCreated) {
      throw new ForbiddenException('User has already created a rating for the deal')
    }

    const rating = await this.ratingsRepository.create(userId, dto)

    const result = await this.ratingsRepository.getAverageRating(dto.toUserId)
    const avg = result._avg.score ?? 0
    await this.usersRepository.updateRating(dto.toUserId, avg)

    return rating
  }


  async getUserRatings (
    toUserId: string,
    dto: GetRatingByUserQueryDto
  ) {
    return this.ratingsRepository.findByUser(toUserId, dto)
  }

}
