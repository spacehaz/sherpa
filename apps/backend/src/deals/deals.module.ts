/**
 * offers.module.ts
 *
 * controllers — registers HTTP routes
 * providers   — registers OffersRepository and OffersService for DI
 */

import { Module } from '@nestjs/common';
import { DealsController } from './deals.controller';
import { DealsRepository } from './deals.repository';
import { DealsService } from './deals.service';
import { AuthModule } from '../auth/auth.module';
import { OffersRepository } from 'src/offers/offers.repository';
import { RequestsRepository } from 'src/requests/requests.repository';

@Module({
  imports: [AuthModule],
  controllers: [DealsController],
  providers: [DealsService, DealsRepository, OffersRepository, RequestsRepository],
})
export class DealsModule {}
