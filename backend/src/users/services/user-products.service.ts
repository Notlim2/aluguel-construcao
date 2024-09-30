import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserProductDto } from '../dto/create-user-product.dto';
import { Repository } from 'typeorm';
import { UserProduct } from '../domain/user-product';
import { UpdateUserProductDto } from '../dto/update-user-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProductEntity } from '../entities/user-product.entity';

@Injectable()
export class UserProductsService {
  constructor(
    @InjectRepository(UserProductEntity)
    private readonly userProductsRepository: Repository<UserProductEntity>,
  ) {}

  async create(userId: string, createUserProductDto: CreateUserProductDto) {
    const { productId } = createUserProductDto;
    const foundUserProduct = await this.userProductsRepository.findOneBy({
      userId,
      productId,
    });
    if (foundUserProduct) {
      throw new ForbiddenException('Produto já adicionado ao carrinho!');
    }
    return this.userProductsRepository.save({
      ...createUserProductDto,
      userId,
    });
  }

  async update(id: string, updateUserProductDto: UpdateUserProductDto) {
    await this.findById(id);
    const { quantity, rentalDays } = updateUserProductDto;
    return this.userProductsRepository.update(
      { id },
      { quantity: quantity || undefined, rentalDays: rentalDays || undefined },
    );
  }

  async findAll(userId: string) {
    return this.userProductsRepository.findBy({ userId });
  }

  async findById(id: UserProduct['id']) {
    const userProduct = await this.userProductsRepository.findOneBy({ id });
    if (!userProduct) {
      throw new NotFoundException('Item do carrinho não encontrado!');
    }
    return userProduct;
  }

  remove(id: string) {
    return this.userProductsRepository.delete({ id });
  }
}
