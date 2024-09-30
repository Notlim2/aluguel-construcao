import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProductEntity } from 'src/products/product.entity';

@Entity({
  name: 'user_product',
})
export class UserProductEntity {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    type: String,
  })
  @Column({ type: 'uuid' })
  userId: string;

  @ApiProperty({
    type: String,
  })
  @Column({ type: 'uuid' })
  productId: string;

  @JoinColumn({ name: 'productId' })
  @ManyToOne(() => ProductEntity, (prod) => prod.userProducts, { eager: true })
  product: ProductEntity;

  @Column({ type: Number })
  quantity: number;

  @Column({ type: Number })
  rentalDays: number;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
