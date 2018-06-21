import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { CheckoutShippingAddressPage } from '../../pages/checkout-shipping-address/checkout-shipping-address';
import { LoginPage } from '../../pages/login/login';
/**
 * Generated class for the CheckoutBillingAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout-billing-address',
  templateUrl: 'checkout-billing-address.html',
})
export class CheckoutBillingAddressPage {

  constructor(public navCtrl: NavController, public menuCtrl: MenuController,public navParams: NavParams) {
  }
  public value  = '';
  public check = '';
  public openMenu():void {
    this.menuCtrl.open();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutBillingAddressPage');
  }

  public loginpage(){
    this.navCtrl.push(LoginPage);
  } 
  Billing(BillingForm){

    if(this.check == 'false' || this.check == ''){

    var billingdata = {

      billing_first_name : BillingForm.value.firstname,
      billing_last_name  : BillingForm.value.lastname,
      billing_address_1 : BillingForm.value.streetaddress,
      billing_address_2 : 'ds',
      billing_city : BillingForm.value.city,
      billing_state : BillingForm.value.state,
      billing_postcode : BillingForm.value.postcode,
      billing_country : BillingForm.value.country,
      billing_email : BillingForm.value.email,
      billing_phone : BillingForm.value.phone,
      ucheck : '',
      upass : ''


    }

    console.log(billingdata);
    localStorage.setItem('BillingAddress(M&R)', JSON.stringify(billingdata));
    this.navCtrl.push(CheckoutShippingAddressPage);

  }else{

      console.log(BillingForm.value.password);

      var billingdataa = {

        billing_first_name : BillingForm.value.firstname,
        billing_last_name  : BillingForm.value.lastname,
        billing_address_1 : BillingForm.value.streetaddress,
        billing_address_2 : BillingForm.value.address2,
        billing_city : BillingForm.value.city,
        billing_state : BillingForm.value.state,
        billing_postcode : BillingForm.value.postcode,
        billing_country : BillingForm.value.country,
        billing_email : BillingForm.value.email,
        billing_phone : BillingForm.value.phone,
        ucheck : '1',
        upass : BillingForm.value.password
  
  
      }
  
      console.log(billingdataa);
      localStorage.setItem('BillingAddress(M&R)', JSON.stringify(billingdataa));
      this.navCtrl.push(CheckoutShippingAddressPage);
  }

  }
  datachanged(e:any){
    console.log(e);
    console.log(e.checked);
    this.check = e.checked;
}


}     
