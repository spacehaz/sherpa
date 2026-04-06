/**
 * prisma.service.ts
 * Wraps PrismaClient and integrates it with NestJS lifecycle.
 * Acts as the single DB connection shared across all repositories.
 * Injected into any repository that needs to query the database.
 */

import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // Connect to the database when the NestJS module is initialized
    await this.$connect();
  }

  async onModuleDestroy() {
    // Gracefully close the DB connection when the app shuts down
    await this.$disconnect();
  }
}
