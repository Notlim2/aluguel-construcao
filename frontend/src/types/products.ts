export default interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  value: number;
}

export interface GetProductFilters {
  skip: number;
  take: number;
  search?: string;
}
