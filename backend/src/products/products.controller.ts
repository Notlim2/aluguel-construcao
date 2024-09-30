import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpCode,
  Query,
  Response,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Product } from './domain/product';
import { ProductsService } from './products.service';
import { GetProductsDto } from './dto/get-products.dto';

@ApiBearerAuth()
@ApiTags('Products')
@Controller({
  path: 'products',
  version: '1',
})
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOkResponse({
    type: Product,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'search',
    type: String,
  })
  async findAll(
    @Response() res: ExpressResponse,
    @Query() filters: GetProductsDto,
  ) {
    const { products, count } = await this.productsService.findAll(filters);
    res.set({ 'query-size': count }).json(products);
  }

  @ApiOkResponse({
    type: Product,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  findOne(@Param('id') id: Product['id']) {
    return this.productsService.findById(id);
  }
}
