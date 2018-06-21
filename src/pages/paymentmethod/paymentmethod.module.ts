import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentmethodPage } from './paymentmethod';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
@NgModule({
  declarations: [
    PaymentmethodPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentmethodPage),
  ],
})
export class PaymentmethodPageModule {}
