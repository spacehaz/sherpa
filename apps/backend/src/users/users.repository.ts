/**
 * users.repository.ts
 * Handles all DB queries related to users.
 * Only talks to Prisma — no business logic here.
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: dto,
    });
  }

  updateRating(userId: string, rating: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { rating },
    });
  }
}
