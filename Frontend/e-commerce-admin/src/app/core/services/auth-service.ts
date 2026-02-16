import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { user } from '../../models/user_model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  //Set Token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  //Get Token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //IsLoggedIn
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  //SetCurrentUser
  setCurrentUser(user: user) {
    const { password, ...userWithoutPassword } = user;
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
  }

  //GetCurrentUser
  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  //login
  login(email: string, password: string): Observable<user> {
    return this.http.get<user[]>(`${this.baseUrl}/users`).pipe(
      map((users) => {
        const foundUser = users.find(
          (u) => u.email === email && u.password === password && u.role === 'admin',
        );
        if (!foundUser) {
          throw new Error('Invalid email or password');
        }
        // Set token and current user
        const token = btoa(foundUser.email + ':' + Date.now());
        this.setToken(token);
        this.setCurrentUser(foundUser);
        return foundUser;
      }),
      catchError((err) => {
        console.error('Error during login', err);
        return throwError(() => new Error('Invalid email or password'));
      }),
    );
  }

  //Sign-Up
  signup(newUser: user): Observable<user> {
    return this.http.get<user[]>(`${this.baseUrl}/users`).pipe(
      switchMap((users) => {
        if (users.find((u) => u.email === newUser.email)) {
          return throwError(() => new Error('Email already exists'));
        }
        return this.http.post<user>(`${this.baseUrl}/users`, newUser);
      }),
      map((createdUser) => {
        const token = btoa(createdUser.email + ':' + Date.now());
        this.setToken(token);
        this.setCurrentUser(createdUser);
        return createdUser;
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }

  //LogOut
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  }

  //   login(email:string, password:string):Observable<user | null>{
  // return this.http.get<user[]>(`${this.baseUrl}/users`).pipe(
  //   map(users => {
  //     const user = users.find((u: user) => u.email === email && u.password === password);
  //     if (user) return user;
  //     throw new Error('Invalid email or password');
  //     })
  //    );
  //   }
}
