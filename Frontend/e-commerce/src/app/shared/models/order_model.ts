export interface OrderItem {
  productId: string;
  productTitle: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  address: string;
  city: string;
  country: string;
  phone: string;
}

export interface Order {
  id?: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'shipped';
  createdAt: string;
  shippingAddress: ShippingAddress;
  paymentMethod: 'cod' | 'credit_card';
}
