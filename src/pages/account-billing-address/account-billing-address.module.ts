import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountBillingAddressPage } from './account-billing-address';

@NgModule({
  declarations: [
    AccountBillingAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountBillingAddressPage),
  ],
})
export class AccountBillingAddressPageModule {}
