import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class GetProductsDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  skip: number = 0;

  @ApiProperty()
  @IsNumber()
  @Min(12)
  take: number = 12;

  @ApiProperty()
  @IsOptional()
  @IsString()
  search?: string;
}
