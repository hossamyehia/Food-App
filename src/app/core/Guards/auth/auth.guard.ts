import { CanActivateFn } from '@angular/router';
import { TokenService } from '../../services/token/token.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(TokenService).isAuthenticated();
};
