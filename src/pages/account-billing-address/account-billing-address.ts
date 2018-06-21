import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController } from 'ionic-angular';
import { AccountBillingAddressEditPage } from '../../pages/account-billing-address-edit/account-billing-address-edit';
import { AccountShippingAddressEditPage } from '../../pages/account-shipping-address-edit/account-shipping-address-edit';
import { Appsetting } from '../../providers/appsetting';
import { Http , RequestOptions , Headers } from '@angular/http';
import { RegisterPage } from '../../pages/register/register';
import 'rxjs/add/operator/map';
/**
 * Generated class for the AccountBillingAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-billing-address',
  templateUrl: 'account-billing-address.html',
})
export class AccountBillingAddressPage {

  public showaddress : any = '';
  public showaddressbilling : any = '';
  public databill = '';
  public dataship = '';
  constructor(public navCtrl: NavController, public http: Http,public navParams: NavParams,public appsetting: Appsetting , public loadingCtrl : LoadingController) {

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loader.present();

    this.fetchaddressshipping();
    this.fetchaddressbilling();

    loader.dismiss();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountBillingAddressPage');
  }
  public AccountBillingAddressEdit():void{ 
    this.navCtrl.push(AccountBillingAddressEditPage);
  }
  public AccountShippingAddressEditPage():void{ 
    this.navCtrl.push(AccountShippingAddressEditPage);
  }

  fetchaddressshipping(){

    var userID = localStorage.getItem('token');
    
    this.http.get(this.appsetting.myGlobalVar + this.appsetting.show_shipping_address + '&userid=' + userID).map(result => 
      result.json()).subscribe(res => {

        console.log(res);

        if(res.msg[0].first_name == '' || res.msg[0].last_name == '' || res.msg[0].email == ''){

          this.showaddress  = '0';

        }else{

          console.log("else");

          this.showaddress  = '1';

          this.dataship = res.msg[0];

        }

      })
  }

  fetchaddressbilling(){

    var userID = localStorage.getItem('token');
    
    this.http.get(this.appsetting.myGlobalVar + this.appsetting.show_billing_address + '&userid=' + userID).map(result => 
      result.json()).subscribe(res => {

        console.log(res);

        if(res.msg[0].first_name == '' || res.msg[0].last_name == '' || res.msg[0].email == ''){

          this.showaddressbilling  = '0';

        }else{

          console.log("else");

          this.showaddressbilling  = '1';

          this.databill = res.msg[0];

        }

      })
  }
}
