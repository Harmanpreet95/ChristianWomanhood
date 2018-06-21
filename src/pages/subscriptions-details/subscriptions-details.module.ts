import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubscriptionsDetailsPage } from './subscriptions-details';

@NgModule({
  declarations: [
    SubscriptionsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SubscriptionsDetailsPage),
  ],
})
export class SubscriptionsDetailsPageModule {}
