import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostCategoryDetailPage } from './post-category-detail';

@NgModule({
  declarations: [
    PostCategoryDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PostCategoryDetailPage),
  ],
})
export class PostCategoryDetailPageModule {}
