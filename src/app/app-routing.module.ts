import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';
import { confirmSavingFormGuard } from './guards/confirm-saving-form.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateUserPasswordComponent } from './components/update-user-password/update-user-password.component';
import { EditUserInfoComponent } from './components/edit-user-info/edit-user-info.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {path:'' , redirectTo: 'home', pathMatch: 'full'},
  {path:'home' , canActivate:[authGuard] , component: HomeComponent},
  {path:'cart' , canActivate:[authGuard]  , component: CartComponent},
  {path:'categories' , canActivate:[authGuard]  , component: CategoriesComponent},
  {path:'products' , canActivate:[authGuard]  , component: ProductsComponent},
  {path:'brands' , canActivate:[authGuard]  , component: BrandsComponent},
  {path:'profile' , canActivate:[authGuard]  , component: ProfileComponent ,
    children:[
     {path:'', redirectTo:'edit-user-info', pathMatch:'full'},
     {path:'update-user-password' , component:UpdateUserPasswordComponent },
     {path:'edit-user-info' , component:EditUserInfoComponent }
    ]
  },
  {path:'wishlist' , canActivate:[authGuard] , component: WishlistComponent},
  {path:'product-details/:id' , canActivate:[authGuard] , component: ProductDetailsComponent},
  {path:'shipping-address/:id/:type' , canActivate:[authGuard] , component: ShippingAddressComponent},
  {path:'allorders' , canActivate:[authGuard] , component: OrdersComponent},
  {path:'login' ,canActivate:[noAuthGuard] , canDeactivate:[confirmSavingFormGuard]  , component: LoginComponent},
  {path:'register' , canActivate:[noAuthGuard] , canDeactivate:[confirmSavingFormGuard]  , component: SignUpComponent},
  {path:'forget-password' ,canActivate:[noAuthGuard] , component: ForgetPasswordComponent},
  {path:'verify-code' ,canActivate:[noAuthGuard]  , component: VerifyCodeComponent},
  {path:'reset-password' ,canActivate:[noAuthGuard]  , component: ResetPasswordComponent},
  {path:'**' , component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {bindToComponentInputs: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
