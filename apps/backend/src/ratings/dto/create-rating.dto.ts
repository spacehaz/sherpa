/**
 * create-rating.dto.ts
 * Defines and validates the request body for POST /ratings.
 */

import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateRatingDto {
  @IsString()
  dealId!: string;

  @IsString()
  toUserId!: string;
  
  @IsIn([1, 2, 3, 4, 5])
  score!: number;

  @IsOptional()
  @IsString()
  comment?: string;

}
