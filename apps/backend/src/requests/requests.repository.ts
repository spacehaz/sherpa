/**
 * requests.repository.ts
 * Handles all DB queries related to requests.
 * Only talks to Prisma — no business logic here.
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateRequestDto } from './dto/update-request.dto';
import { CreateRequestDto } from './dto/create-request.dto';
import { GetRequestsQueryDto } from './dto/get-requests-query.dto';

@Injectable()
export class RequestsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.request.findUnique({ where: { id } });
  }

  findAllByUser(userId: string, params: GetRequestsQueryDto) {
    const { limit = 20, page = 1, status, property, direction } = params
    return this.prisma.request.findMany({
      where: { userId, ...(status ? { status } : {}) },
      orderBy: property ? { [property]: direction ?? 'asc' } : { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    })
  }

  findAll(params: GetRequestsQueryDto) {
    const { 
      status,
      property,
      direction,
      limit = 20,
      page = 1
    } = params

    return this.prisma.request.findMany({
      where: status ? { status } : undefined,
      orderBy: property ? { [property]: direction ?? 'asc' } : { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  update(id: string, dto: UpdateRequestDto) {
    return this.prisma.request.update({
      where: { id },
      data: dto,
    });
  }

  delete(id: string) {
    return this.prisma.request.delete({
      where: { id }
    });
  }

  create(
    userId: string,
    dto: CreateRequestDto
  ) {
    return this.prisma.request.create({
      data: { ...dto, deliveryDate: new Date(dto.deliveryDate), userId }
    });
  }
}
