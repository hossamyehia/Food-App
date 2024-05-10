import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';

export const userGuard: CanActivateFn = (route, state) => {
  let _router = inject(Router);
  let _tokenService = inject(TokenService);

  if(_tokenService.isUser()) return true;

  _router.navigate(["/auth"])
  return false;
};
