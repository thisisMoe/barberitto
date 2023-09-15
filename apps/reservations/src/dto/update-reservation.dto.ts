import { IsDate, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateReservationDto {
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  endDate: Date;

  @IsString()
  @IsOptional()
  placeId: string;

  @IsString()
  @IsOptional()
  invoiceId: string;
}
