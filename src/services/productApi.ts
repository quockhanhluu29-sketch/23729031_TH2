import { apiClient } from './apiClient';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export async function fetchProducts(): Promise<Product[]> {
  const response = await apiClient.get<Product[]>('/products?limit=12');
  return response.data;
}