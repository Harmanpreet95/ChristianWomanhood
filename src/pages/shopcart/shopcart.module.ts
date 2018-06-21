import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopcartPage } from './shopcart';

@NgModule({
  declarations: [
    ShopcartPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopcartPage),
  ],
})
export class ShopcartPageModule {}
