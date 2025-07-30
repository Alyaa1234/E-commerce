import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  // inject the Router service
  let router = inject(Router);

  //  return true ====> activate route
  //  return false ====> prevent route
  if(localStorage.getItem("applicationToken")){
    return true;
  }

  // redirect to login page
  router.navigate(['/login']);
  return false;
};
