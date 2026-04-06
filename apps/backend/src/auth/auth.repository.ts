/**
 * auth.repository.ts
 * Handles all DB queries related to authentication.
 * Only talks to Prisma — no business logic here.
 */

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Find a user by email — used during login to check if the user exists
  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  // Create a new user — passwordHash is stored, never the raw password
  create(data: { email: string; passwordHash: string; name: string }) {
    return this.prisma.user.create({ data });
  }
}
