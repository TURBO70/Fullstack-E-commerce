import { inject } from '@angular/core/primitives/di';
import { CanActivateChildFn, Router } from '@angular/router';

export const authGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);

  return localStorage.getItem('token') ? true : router.parseUrl('');
};
