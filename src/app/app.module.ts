import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateUserPasswordComponent } from './components/update-user-password/update-user-password.component';
import { EditUserInfoComponent } from './components/edit-user-info/edit-user-info.component';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CategoriesSliderComponent } from './components/categories-slider/categories-slider.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { authInterceptor } from './interceptors/auth.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './interceptors/loading.interceptor';
import { ShippingAddressComponent } from './components/shipping-address/shipping-address.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SearchPipe } from './pipes/search.pipe';
import { WishlistComponent } from './components/wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    NotFoundComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProductsComponent,
    CartComponent,
    CategoriesComponent,
    BrandsComponent,
    ForgetPasswordComponent,
    VerifyCodeComponent,
    ResetPasswordComponent,
    ProfileComponent,
    UpdateUserPasswordComponent,
    EditUserInfoComponent,
    ProductComponent,
    ProductDetailsComponent,
    CategoriesSliderComponent,
    MainSliderComponent,
    ShippingAddressComponent,
    OrdersComponent,
    SearchPipe,
    WishlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgxSpinnerModule,
    FormsModule
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor , loadingInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
