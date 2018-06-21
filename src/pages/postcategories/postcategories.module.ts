import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostcategoriesPage } from './postcategories';

@NgModule({
  declarations: [
    PostcategoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(PostcategoriesPage),
  ],
})
export class PostcategoriesPageModule {}
