/**
 * offers.module.ts
 *
 * controllers — registers HTTP routes
 * providers   — registers OffersRepository and OffersService for DI
 */

import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller';
import { OffersRepository } from './offers.repository';
import { OffersService } from './offers.service';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [AuthModule],
  controllers: [OffersController],
  providers: [OffersService, OffersRepository],
})
export class OffersModule {}
