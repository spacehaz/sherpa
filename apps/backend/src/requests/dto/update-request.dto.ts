/**
 * update-offer.dto.ts
 * Defines and validates the request body for PATCH /offers/:offerId.
 */


import { ItemCategory } from '@sherpa/shared';
import { IsString, IsOptional, IsNumber, IsDateString, IsEnum } from 'class-validator';

export class UpdateRequestDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;
  
  @IsOptional()
  @IsEnum(ItemCategory)
  category?: ItemCategory;

  @IsOptional()
  @IsString()
  store?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsNumber()
  priceOriginal?: number;

  @IsOptional()
  @IsNumber()
  markupPercent?: number;

  @IsOptional()
  @IsDateString()
  deliveryDate?: string;

}
