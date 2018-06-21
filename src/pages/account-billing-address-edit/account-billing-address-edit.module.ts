import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountBillingAddressEditPage } from './account-billing-address-edit';

@NgModule({
  declarations: [
    AccountBillingAddressEditPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountBillingAddressEditPage),
  ],
})
export class AccountBillingAddressEditPageModule {}
