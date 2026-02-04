export interface ProductForm {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  categoryId: number;
  stock: number;
  unit: string;
  isOrganic: boolean;
  isFeatured: boolean;
}
