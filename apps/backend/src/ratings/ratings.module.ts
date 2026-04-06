/**
 * offers.module.ts
 *
 * controllers — registers HTTP routes
 * providers   — registers OffersRepository and OffersService for DI
 */

import { Module } from '@nestjs/common';
import { RatingsController } from './ratings.controller';
import { RatingsRepository } from './ratings.repository';
import { RatingsService } from './ratings.service';
import { AuthModule } from '../auth/auth.module';
import { UsersRepository } from 'src/users/users.repository';
import { DealsRepository } from 'src/deals/deals.repository';

@Module({
  imports: [AuthModule],
  controllers: [RatingsController],
  providers: [RatingsService, RatingsRepository, UsersRepository, DealsRepository],
})
export class RatingsModule {}
