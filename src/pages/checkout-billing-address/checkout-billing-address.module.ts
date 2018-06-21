import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckoutBillingAddressPage } from './checkout-billing-address';

@NgModule({
  declarations: [
    CheckoutBillingAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckoutBillingAddressPage),
  ],
})
export class CheckoutBillingAddressPageModule {}
