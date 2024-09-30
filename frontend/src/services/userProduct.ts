import axiosInstance from '../helpers/axiosInstance';
import {
  CreateUserProductDto,
  UpdateUserProductDto,
} from '../types/userProduct';

const baseUrl = `/api/v1/user-products`;

export function findCartItemsService() {
  return axiosInstance.get(baseUrl);
}

export function addToCartService(data: CreateUserProductDto) {
  return axiosInstance.post(baseUrl, data);
}

export function updateUserProductService(
  userProductId: string,
  data: UpdateUserProductDto
) {
  return axiosInstance.patch(`${baseUrl}/${userProductId}`, data);
}

export function removeUserProductService(userProductId: string) {
  return axiosInstance.delete(`${baseUrl}/${userProductId}`);
}
