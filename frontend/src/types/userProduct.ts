import Product from './products';

export interface UserProduct {
  id: string;
  product: Product;
  quantity: number;
  rentalDays: number;
}

export interface CreateUserProductDto {
  productId: string;
  quantity: number;
  rentalDays: number;
}

export interface UpdateUserProductDto {
  quantity?: number;
  rentalDays?: number;
}
