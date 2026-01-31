import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../../shared/models/user_model';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  private BaseUrl = 'http://localhost:3000/users';

  getUserById(id: string) {
    return this.http.get<user>(`${this.BaseUrl}/${id}`);
  }

  updateUserData(id: string, body: user) {
    return this.http.put<user>(`${this.BaseUrl}/${id}`, body);
  }
  deleteUserById(id: string) {
    return this.http.delete<user>(`${this.BaseUrl}/${id}`);
  }
  //sign up
  addUser(body: user) {
    return this.http.post<user>(this.BaseUrl, body);
  }
}
