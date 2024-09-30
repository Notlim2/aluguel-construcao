import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateUserProductDto {
  @IsOptional()
  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsOptional()
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(30)
  rentalDays: number;
}
