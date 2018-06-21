import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutShippingAddressPage } from './checkout-shipping-address';

@NgModule({
  declarations: [
    CheckoutShippingAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutShippingAddressPage),
  ],
})
export class CheckoutShippingAddressPageModule {}
