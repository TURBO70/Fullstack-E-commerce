export interface OrderItem {
  productId: string;
  productTitle: string;
  price: number;
  quantity: number;
}

export interface Order {
  // id?: string;
  userId: number;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped';
  createdAt: string;
}
