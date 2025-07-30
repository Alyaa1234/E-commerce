import { CanDeactivateFn } from '@angular/router';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { LoginComponent } from '../components/login/login.component';

export const confirmSavingFormGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {

  if(component instanceof SignUpComponent || component instanceof LoginComponent)
  {
    component.canDeactivate();
  }

  return true;
};
