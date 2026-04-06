/**
 * deals.repository.ts
 * Handles all DB queries related to deals.
 * Only talks to Prisma — no business logic here.
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateDealStatusDto } from './dto/update-deal-status.dto';
import { CreateDealDto } from './dto/create-deal.dto';
import { CreateMessageDto } from './dto/create-message.dto';
import { GetMyDealsQueryDto } from './dto/get-my-deals-query.dto';
import { GetMyDealMessagesQueryDto } from './dto/get-my-deal-messages-query.dto';

@Injectable()
export class DealsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.deal.findUnique({ where: { id } });
  }

  findMyDeals(
    userId: string,
    params: GetMyDealsQueryDto
  ) {
    const { 
      status,
      limit = 20,
      page = 1,
      property,
      direction
    } = params

    return this.prisma.deal.findMany({
      where: {
        OR: [{ initiatorId: userId }, { responderId: userId }],
        ...(status ? { status } : {}),
      },
      orderBy: property ? { [property]: direction ?? 'asc' } : { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  findMessages(
    dealId: string,
    params: GetMyDealMessagesQueryDto
  ) {
    const { 
      limit = 20,
      page = 1,
      property,
      direction
    } = params

    return this.prisma.dealMessage.findMany({
      where: { dealId },
      orderBy: property ? { [property]: direction ?? 'asc' } : { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  updateStatus(dealId: string, dto: UpdateDealStatusDto) {
    return this.prisma.deal.update({
      where: { id: dealId },
      data: dto,
    });
  }

  delete(dealId: string) {
    return this.prisma.deal.delete({
      where: { id: dealId }
    });
  }

  create(
    userId: string,
    responderId: string,
    travelerId: string,
    dto: CreateDealDto
  ) {
    return this.prisma.deal.create({
      data: { ...dto, initiatorId: userId, responderId, travelerId }
    });
  }


  createMessage(
    dealId: string,
    senderId: string, // is userId from decorator
    dto: CreateMessageDto
  ) {
    return this.prisma.dealMessage.create({
      data: { ...dto, dealId, senderId }
    });
  }

  rejectOtherDeals(
    dealId: string,
    offerId?: string,
    requestId?: string
  ) {
    return this.prisma.deal.updateMany({
      where: {
        id: { not: dealId },
        status: 'pending',
        ...(offerId ? { offerId } : { requestId }),
      },
      data: { status: 'rejected' },
    });
  }
}
