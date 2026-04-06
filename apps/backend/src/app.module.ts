/**
 * app.module.ts
 * Root module of the application.
 * Imports all feature modules and global configuration.
 * NestJS builds the full dependency tree starting from here.
 */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OffersModule } from './offers/offers.module';
import { RequestsModule } from './requests/requests.module';
import { DealsModule } from './deals/deals.module';
import { RatingsModule } from './ratings/ratings.module';


@Module({
  imports: [
    // ConfigModule loads .env variables and makes them available
    // globally via ConfigService — no need to import it in every module
    ConfigModule.forRoot({ isGlobal: true }),
    // PrismaModule is global — PrismaService is available in all modules automatically
    PrismaModule,
    // Feature modules
    AuthModule,
    UsersModule,
    OffersModule,
    RequestsModule,
    DealsModule,
    RatingsModule
  ],
})
export class AppModule {}
