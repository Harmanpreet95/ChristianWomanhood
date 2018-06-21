import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
/**
 * Generated class for the DemoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-meetloretta',
  templateUrl: 'meetloretta.html',
})
export class MeetlorettaPage {

  constructor(public navCtrl: NavController,public menuCtrl: MenuController, public navParams: NavParams) {
    // alert("sd");
    this.menuCtrl.close();
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
    console.log('ionViewDidLoad DemoPage');
  }
  public openMenu():void {
    this.menuCtrl.open();
  }
}
