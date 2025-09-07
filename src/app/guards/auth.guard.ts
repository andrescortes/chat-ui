import { inject } from "@angular/core";
import { CanActivateFn, Router } from '@angular/router';
import { LOGIN_ROUTE } from "../constants";
import { AuthService } from "../services/auth.service";

export const authGuard: CanActivateFn = (route, state) => {
  if (!inject(AuthService).isLoggedIn) {
    inject(Router).navigate([LOGIN_ROUTE]).then();
    return false;
  } else {
    return true;
  }
};
