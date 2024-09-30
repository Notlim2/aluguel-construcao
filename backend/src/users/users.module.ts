import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { UserProductsController } from './controllers/user-products.controller';
import { UserProductsService } from './services/user-products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserProductEntity } from './entities/user-product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([UserProductEntity]),
  ],
  controllers: [UsersController, UserProductsController],
  providers: [UsersService, UserProductsService],
  exports: [UsersService],
})
export class UsersModule {}
