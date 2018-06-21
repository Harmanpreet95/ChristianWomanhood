import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrontCategoriesPage } from './front-categories';

@NgModule({
  declarations: [
    FrontCategoriesPage
  ],
  imports: [
    IonicPageModule.forChild(FrontCategoriesPage),
  ],
})
export class FrontCategoriesPageModule {}
