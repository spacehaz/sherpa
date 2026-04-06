/**
 * update-deal.dto.ts
 * Defines and validates the request body for PATCH /deals.
 */

import { IsString, IsOptional, IsNumber, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class GetMyDealMessagesQueryDto {
  @IsOptional()
  @Type(() => Number)   // converts string from query param to number
  @IsNumber()
  page?: number;

  @IsOptional()
  @IsString()
  property?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  direction?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
