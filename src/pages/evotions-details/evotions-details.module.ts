import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EvotionsDetailsPage } from './evotions-details';

@NgModule({
  declarations: [
    EvotionsDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(EvotionsDetailsPage),
  ],
})
export class EvotionsDetailsPageModule {}
