import axiosInstance from '../helpers/axiosInstance';
import { GetProductFilters } from '../types/products';

const baseUrl = `/api/v1/products`;

export function getProductsService(filters: GetProductFilters) {
  return axiosInstance.get(baseUrl, { params: filters });
}

export function getProductService(productId: string) {
  return axiosInstance.get(`${baseUrl}/${productId}`);
}
