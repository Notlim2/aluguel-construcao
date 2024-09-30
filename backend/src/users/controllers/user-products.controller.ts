import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  HttpStatus,
  HttpCode,
  Patch,
  Request,
  SerializeOptions,
  Delete,
} from '@nestjs/common';
import { CreateUserProductDto } from '../dto/create-user-product.dto';
import { UpdateUserProductDto } from '../dto/update-user-product.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UserProduct } from '../domain/user-product';
import { UserProductsService } from '../services/user-products.service';
import { DeleteResult } from 'typeorm';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('UserProducts')
@Controller({
  path: 'user-products',
  version: '1',
})
export class UserProductsController {
  constructor(private readonly userProductsService: UserProductsService) {}

  @ApiCreatedResponse({
    type: UserProduct,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(
    @Request() req: { user: any },
    @Body() createUserProductDto: CreateUserProductDto,
  ) {
    return this.userProductsService.create(req.user.id, createUserProductDto);
  }

  @ApiCreatedResponse({
    type: UserProduct,
  })
  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  @ApiParam({ name: 'id', type: String, required: true })
  update(
    @Param('id') id: string,
    @Body() udateUserProductDto: UpdateUserProductDto,
  ) {
    return this.userProductsService.update(id, udateUserProductDto);
  }

  @ApiOkResponse({
    type: UserProduct,
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'userId',
    type: String,
    required: true,
  })
  findAll(@Request() req: { user: any }): Promise<UserProduct[]> {
    return this.userProductsService.findAll(req.user.id);
  }

  @ApiOkResponse({
    type: DeleteResult,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @SerializeOptions({
    groups: ['me'],
  })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.userProductsService.remove(id);
  }
}
