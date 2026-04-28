/**
 * requests.module.ts
 *
 * controllers — registers HTTP routes
 * providers   — registers RequestsRepository and RequestsService for DI
 */

import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsRepository } from './requests.repository';
import { RequestsService } from './requests.service';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';


@Module({
  imports: [AuthModule, CloudinaryModule],
  controllers: [RequestsController],
  providers: [RequestsService, RequestsRepository],
})
export class RequestsModule {}
