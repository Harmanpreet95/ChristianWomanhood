import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubscriptionsPage } from './subscriptions';

@NgModule({
  declarations: [
    SubscriptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(SubscriptionsPage),
  ],
})
export class SubscriptionsPageModule {}
