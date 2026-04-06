/**
 * prisma.module.ts
 * NestJS module that provides PrismaService to the rest of the app.
 * Marked as Global so every other module gets PrismaService automatically
 * without needing to import PrismaModule in each feature module.
 */

import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService], // creates and manages the PrismaService instance
  exports: [PrismaService],   // exposes it to any module that imports PrismaModule
})
export class PrismaModule {}
