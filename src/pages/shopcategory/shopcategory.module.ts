import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShopCategoryPage } from './shopcategory';

@NgModule({
  declarations: [
    ShopCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ShopCategoryPage),
  ],
})
export class ShopCategoryPageModule {}
