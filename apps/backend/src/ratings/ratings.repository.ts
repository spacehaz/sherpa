/**
 * ratings.repository.ts
 * Handles all DB queries related to ratings.
 * Only talks to Prisma — no business logic here.
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { GetRatingByUserQueryDto } from './dto/get-rating-by-user-query';

@Injectable()
export class RatingsRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(
    userId: string,
    dto: CreateRatingDto
  ) {
    return this.prisma.rating.create({
      data: { ...dto, fromUserId: userId }
    });
  }

  findByUser(
    userId: string,
    params: GetRatingByUserQueryDto
  ) {

    const { 
      direction,
      limit = 20,
      page = 1
    } = params
  
    return this.prisma.rating.findMany({
      where:  { toUserId: userId },
      orderBy: { createdAt: direction ?? 'asc' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  getAverageRating(userId: string) {
    return this.prisma.rating.aggregate({
      where: { toUserId: userId },
      _avg: { score: true },
    });
  }

  findExisting(dealId: string, fromUserId: string) {
    return this.prisma.rating.findFirst({
      where: { dealId, fromUserId }
    });
  }
}
