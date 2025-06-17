import { inject } from '@angular/core';
import { CanActivateFn , Router} from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // debugger;
  const localUser = localStorage.getItem("EmpErpUser")
  const router = inject(Router);

  if(localUser!= null){
    return true;
  }
  else{
    router.navigateByUrl("/login")
    return false;
  }
};
