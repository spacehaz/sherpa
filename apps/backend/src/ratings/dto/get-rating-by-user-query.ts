/**
 * get-rating-by-user-query.ts
 * Defines and validates the request query params for GET /ratings.
 */

import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsIn } from 'class-validator';

export class GetRatingByUserQueryDto {

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