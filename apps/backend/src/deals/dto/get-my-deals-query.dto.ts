/**
 * update-deal.dto.ts
 * Defines and validates the request body for PATCH /deals.
 */
  
  
import { DealStatus } from '@sherpa/shared';
import { IsEnum, IsOptional, IsNumber, IsString, IsIn } from 'class-validator';
import { Type } from 'class-transformer';

export class GetMyDealsQueryDto {
  @IsOptional()
  @IsEnum(DealStatus)
  status?: DealStatus;

  @IsOptional()
  @IsString()
  property?: string;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  direction?: 'asc' | 'desc';

  @IsOptional()
  @Type(() => Number)   // converts string from query param to number
  @IsNumber()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number;
}
