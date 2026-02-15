import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../../shared/models/order_model';
import { AuthService } from './auth-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private BaseUrl = 'http://localhost:3000/orders';
  constructor(private http:HttpClient,private authService: AuthService) {}
  
  getAllOrders() {
    return this.http.get<Order[]>(this.BaseUrl);
  }
  getOrdersByUserId(userId: string) {
    return this.http.get<Order[]>(`${this.BaseUrl}?userId=${userId}`);
  }

 // Create order - automatically adds userId from logged-in user
 createOrder(orderData: Omit<Order, 'id' | 'userId' | 'createdAt'>): Observable<Order> {
    const currentUser = this.authService.getCurrentUser();
    const order: Omit<Order, 'id'> = {
      ...orderData,
      userId: currentUser.id, 
      createdAt: new Date().toISOString().split('T')[0], 
    };
    return this.http.post<Order>(this.BaseUrl, order);
  }

  updateOrderStatus(orderId: string, status: 'pending' | 'confirmed' | 'shipped'):Observable<Order> {
    return this.http.patch<Order>(`${this.BaseUrl}/${orderId}`, { status });
  }

  deleteOrder(orderId: string): Observable<void> {
    return this.http.delete<void>(`${this.BaseUrl}/${orderId}`);
  }
}
