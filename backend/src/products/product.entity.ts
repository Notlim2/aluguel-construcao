import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserProductEntity } from 'src/users/entities/user-product.entity';

@Entity({
  name: 'product',
})
export class ProductEntity {
  @ApiProperty({
    type: String,
  })
  @PrimaryGeneratedColumn()
  id: string;

  @ApiProperty({
    type: String,
    example: 'Concrete Mixer',
  })
  @Column({ type: String })
  name: string;

  @ApiProperty({
    type: String,
  })
  @Column({ type: String, nullable: true })
  description: string | null;

  @ApiProperty({
    type: String,
  })
  @Column()
  imageUrl: string;

  @ApiProperty({
    type: String,
  })
  @Column({ type: 'float' })
  value: number;

  @OneToMany(() => UserProductEntity, (up) => up.product, { eager: false })
  userProducts: UserProductEntity[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
