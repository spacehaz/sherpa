/**
 * create-message.dto.ts
 * Defines and validates the request body for POST /deals/:id/message.
 */


import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  message!: string;
  
  @IsOptional()
  @IsNumber()
  proposedMarkupPercent?: number;
}
