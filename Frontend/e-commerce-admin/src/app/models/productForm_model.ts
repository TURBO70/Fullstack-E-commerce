export interface ProductForm {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  categoryId: string;
  stock: number;
  unit?: string;
  isOrganic: boolean;
  isFeatured: boolean;
}
