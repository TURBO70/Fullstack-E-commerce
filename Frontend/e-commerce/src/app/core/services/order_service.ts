import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../shared/models/order_model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private BaseUrl = 'http://localhost:3000/orders';
  constructor(private http:HttpClient) {}
  
  getAllOrders() {
    return this.http.get<Order[]>(this.BaseUrl);
  }
  getOrdersByUserId(userId: string) {
    return this.http.get<Order[]>(`${this.BaseUrl}?userId=${userId}`);
  }

  createOrder(order: Omit<Order, 'id'>) {
    return this.http.post<Order>(this.BaseUrl, order);
  }

  updateOrderStatus(orderId: string, status: 'pending' | 'confirmed' | 'shipped') {
    return this.http.patch<Order>(`${this.BaseUrl}/${orderId}`, { status });
  }


  
}
