import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CustomHeaderComponentPage } from './custom-header-component';

@NgModule({
  declarations: [
    CustomHeaderComponentPage,
  ],
  imports: [
    IonicPageModule.forChild(CustomHeaderComponentPage),
  ],
})
export class CustomHeaderComponentPageModule {}
