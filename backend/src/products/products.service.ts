import { Injectable } from '@nestjs/common';
import { Product } from './domain/product';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './product.entity';
import { GetProductsDto } from './dto/get-products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productsRepository: Repository<ProductEntity>,
  ) {}

  async findAll(filters: GetProductsDto) {
    const { search, skip, take } = filters;
    const mountedWhere = search?.length
      ? [{ name: ILike(`%${search}%`) }, { description: ILike(`%${search}%`) }]
      : undefined;
    const products = await this.productsRepository.find({
      where: mountedWhere,
      skip,
      take,
    });
    const count = await this.productsRepository.count({ where: mountedWhere });

    return { products, count };
  }

  findById(id: Product['id']) {
    return this.productsRepository.findOneBy({ id });
  }
}
