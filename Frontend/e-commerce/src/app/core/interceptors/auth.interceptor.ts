import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  if (token) {
    // Clone the request and add the authorization header
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Debug: Log that token is being added
    console.log('🔐 Auth Interceptor: Token added to request', {
      url: req.url,
      method: req.method,
      hasToken: !!token
    });
    
    return next(clonedRequest);
  }

  // Debug: Log when no token is found
  console.log('⚠️ Auth Interceptor: No token found for request', {
    url: req.url,
    method: req.method
  });

  // If no token, proceed with the original request
  return next(req);
};

