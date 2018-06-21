import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutShippingDetailsPage } from './checkout-shipping-details';

@NgModule({
  declarations: [
    CheckoutShippingDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutShippingDetailsPage),
  ],
})
export class CheckoutShippingDetailsPageModule {}
