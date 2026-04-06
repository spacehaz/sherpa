/**
 * create-offer.dto.ts
 * Defines and validates the request body for POST /offers.
 */


import { ItemCategory } from '@sherpa/shared';
import { IsString, IsOptional, IsNumber, IsDateString, IsEnum } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;
  
  @IsEnum(ItemCategory)
  category!: ItemCategory;

  @IsOptional()
  @IsString()
  store?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsNumber()
  priceOriginal!: number;

  @IsNumber()
  markupPercent!: number;

  @IsDateString()
  deliveryDate!: string;
}
