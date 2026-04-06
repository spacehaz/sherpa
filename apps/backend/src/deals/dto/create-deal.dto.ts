/**
 * create-deal.dto.ts
 * Defines and validates the request body for POST /deals.
 */


import { IsString, IsOptional } from 'class-validator';


export class CreateDealDto {
  @IsOptional()
  @IsString()
  offerId?: string;

  @IsOptional()
  @IsString()
  requestId?: string;
}
