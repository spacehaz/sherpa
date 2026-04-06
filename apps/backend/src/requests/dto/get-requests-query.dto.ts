/**
 * get-offers-query.dto.ts
 * Defines and validates the request body for GET /offers.
 */


import { RequestStatus } from '@sherpa/shared';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsIn, IsEnum } from 'class-validator';

export class GetRequestsQueryDto {
  @IsOptional()
  @IsEnum(RequestStatus)
  status?: RequestStatus;

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