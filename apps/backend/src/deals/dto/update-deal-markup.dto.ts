import { IsNumber, Min } from 'class-validator';

export class UpdateDealMarkupDto {
  @IsNumber()
  @Min(0)
  markupPercent!: number;
}
