import { ApiProperty } from '@nestjs/swagger';

export class UserProduct {
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  userId: string;

  @ApiProperty({
    type: String,
  })
  productId: string;

  @ApiProperty({
    type: Number,
  })
  quantity: number;

  @ApiProperty({
    type: Number,
  })
  rentalDays: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
