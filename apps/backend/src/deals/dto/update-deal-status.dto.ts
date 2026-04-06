/**
 * update-deal.dto.ts
 * Defines and validates the request body for PATCH /deals.
 */
  
  
import { DealStatus } from '@sherpa/shared';
import { IsEnum } from 'class-validator';
  
export class UpdateDealStatusDto {
  @IsEnum(DealStatus)
  status!: DealStatus;
}
