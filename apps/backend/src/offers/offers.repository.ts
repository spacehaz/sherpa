/**
 * offers.repository.ts
 * Handles all DB queries related to offers.
 * Only talks to Prisma — no business logic here.
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { CreateOfferDto } from './dto/create-offer.dto';
import { GetOffersQueryDto } from './dto/get-offers-query.dto';

@Injectable()
export class OffersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.offer.findUnique({ where: { id } });
  }

  findAllByUser(userId: string, params: GetOffersQueryDto) {
    const { limit = 20, page = 1, status, property, direction } = params
    return this.prisma.offer.findMany({
      where: { userId, ...(status ? { status } : {}) },
      orderBy: property ? { [property]: direction ?? 'asc' } : { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  findAll(params: GetOffersQueryDto) {
    const { 
      status,
      property,
      direction,
      limit = 20,
      page = 1
    } = params

    return this.prisma.offer.findMany({
      where: status ? { status } : undefined,
      orderBy: property ? { [property]: direction ?? 'asc' } : { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  update(id: string, dto: UpdateOfferDto) {
    return this.prisma.offer.update({
      where: { id },
      data: dto,
    });
  }

  delete(id: string) {
    return this.prisma.offer.delete({
      where: { id }
    });
  }

  create(
    userId: string,
    dto: CreateOfferDto,
    imageUrl?: string,
  ) {
    return this.prisma.offer.create({
      data: { ...dto, deliveryDate: new Date(dto.deliveryDate), userId, imageUrl }
    });
  }
}
