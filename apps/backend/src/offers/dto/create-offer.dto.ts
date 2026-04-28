/**
 * create-offer.dto.ts
 * Defines and validates the request body for POST /offers.
 */


import { ItemCategory } from '@sherpa/shared';
import { IsString, IsOptional, IsNumber, IsDateString, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateOfferDto {
  @IsString()
  title!: string;

  @IsOptional()
  @IsString()
  description?: string;
  
  @IsEnum(ItemCategory)
  category!: ItemCategory;

  @IsString()
  from!: string;

  @IsString()
  to!: string;

  @IsOptional()
  @IsString()
  store?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  weight?: number;

  @Type(() => Number)
  @IsNumber()
  priceOriginal!: number;

  @Type(() => Number)
  @IsNumber()
  markupPercent!: number;

  @IsDateString()
  deliveryDate!: string;
}
