import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAccountyOrderPage } from './my-accounty-order';

@NgModule({
  declarations: [
    MyAccountyOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAccountyOrderPage),
  ],
})
export class MyAccountyOrderPageModule {}
