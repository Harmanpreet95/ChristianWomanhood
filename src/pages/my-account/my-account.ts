import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams , Nav , ToastController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { MyAccountyOrderPage } from '../../pages/my-accounty-order/my-accounty-order';
import { AccountBillingAddressPage } from '../../pages/account-billing-address/account-billing-address';
import { AccountAccountDetailsPage } from '../../pages/account-account-details/account-account-details';
import { LoginPage } from '../../pages/login/login';
import { Appsetting } from '../../providers/appsetting';
import { Http , RequestOptions , Headers } from '@angular/http';
/**
 * Generated class for the MyAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html',
})
export class MyAccountPage {
  @ViewChild(Nav) nav: Nav;

  public value : any = '';
  constructor(public navCtrl: NavController, public menuCtrl: MenuController,public appsetting: Appsetting, public navParams: NavParams,public http: Http , public toastCtrl: ToastController) {



  }
  public openMenu():void {
    this.menuCtrl.open();
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
    console.log('ionViewDidLoad MyAccountPage');
  }
  MyAccountyOrder():void{
    this.navCtrl.push(MyAccountyOrderPage);
  }
  MyAccountAddress():void{
    this.navCtrl.push(AccountBillingAddressPage);
  }
  AccountAccountDetailsPage():void{
    this.navCtrl.push(AccountAccountDetailsPage);
  }
  Logout(){
    localStorage.removeItem('token');
    localStorage.clear();
    console.log(localStorage);
    this.navCtrl.push(LoginPage);
  }


}
