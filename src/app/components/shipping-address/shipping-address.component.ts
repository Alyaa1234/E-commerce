import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shipping-address',
  standalone: false,
  templateUrl: './shipping-address.component.html',
  styleUrl: './shipping-address.component.css'
})
export class ShippingAddressComponent {

  @Input() id! :string;
  @Input() type! :string;

  shippingAddressForm = new FormGroup({
    details : new FormControl('' , Validators.required),
    city : new FormControl('' , Validators.required),
    phone : new FormControl('' , Validators.required),
  })

  orderService = inject(OrderService);
  routerService = inject(Router);
  cartService = inject(CartService)

  redirectUserToPaymentPage(url: string)
  {
    window.location.href = url;
  }

  onlinePayment()
  {
    if(this.type == 'cash')
    {
      this.orderService.cashOrder(this.shippingAddressForm.value, this.id).subscribe({
        next: (response) => {
          // console.log('Cash order created:', response);
          this.cartService.numOfCartItemsSubject.next(0);
          this.routerService.navigate(['/allorders']);
          alert('Order placed successfully! You can view your orders in the Orders section.');
        },
        error: (error) => {
          console.error('Error creating cash order:', error);
          this.routerService.navigate(['/cart'])
        }
      });
    }
    else if(this.type == 'card')
    {
      this.orderService.checkoutSession(this.shippingAddressForm.value, this.id).subscribe({
        next: (response) => {
        //  console.log('Checkout session created:', response);
         this.redirectUserToPaymentPage(response.session.url);
       },
        error: (error) => {
        console.error('Error creating checkout session:', error);
       }
      });
    }

  }



}
