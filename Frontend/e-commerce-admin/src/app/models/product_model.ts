export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  categoryId: string;
  stock: number;
  unit: string;
  rating: number;
  reviews: number;
  isOrganic: boolean;
  isFeatured: boolean;
  createdAt: string;
}
