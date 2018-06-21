import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController } from 'ionic-angular';
import { CheckoutReviewPaymentPage } from '../../pages/checkout-review-payment/checkout-review-payment';
import { PaymentmethodPage } from '../../pages/paymentmethod/paymentmethod';
import { CheckoutShippingDetailsPage } from '../../pages/checkout-shipping-details/checkout-shipping-details';
/**
 * Generated class for the CheckoutShippingAddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout-shipping-address',
  templateUrl: 'checkout-shipping-address.html',
})
export class CheckoutShippingAddressPage {
  public ship :any= '';
  public value = 0;
  public check= '';
  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutShippingAddressPage');
  }
  payment(ordernotes){
    console.log(ordernotes);
    console.log(this.check);
    if(ordernotes == '' || ordernotes == undefined){

      let toast = this.toastCtrl.create({
        message:  'Enter OrderNotes!',
        duration: 3000
      });
      toast.present();

    }else if(this.check == 'false' || this.check == ''){
      console.log('if');
      this.ship = JSON.parse(localStorage.getItem('BillingAddress(M&R)'));
      console.log(this.ship.billing_first_name);

      var shippingdata = {

          shipping_first_name : this.ship.billing_first_name ,
          shipping_last_name : this.ship.billing_last_name,
          shipping_address_1 : this.ship.billing_address_1,
          shipping_address_2 : this.ship.billing_address_2,
          shipping_city : this.ship.billing_city,
          shipping_state : this.ship.billing_state,
          shipping_postcode : this.ship.billing_postcode,
          shipping_country : this.ship.billing_country ,
          shipping_email : this.ship.billing_email,
          shipping_phone : this.ship.billing_phone 

      }

      let shippingdetail = Object.assign({}, shippingdata , { 'ordernotes' : ordernotes });
      console.log(shippingdetail);
      localStorage.setItem('ShippingAddress(M&R)',JSON.stringify(shippingdetail));
      this.navCtrl.push(PaymentmethodPage);
    }else{
      this.navCtrl.push(CheckoutShippingDetailsPage,{'orderNotes' : ordernotes});
    }
  }


  datachanged(e:any,ordernotes){
    console.log(e);
    console.log(e.checked);
    this.check = e.checked;
    // console.log(ordernotes);
    // this.navCtrl.push(CheckoutShippingDetailsPage,{'orderNotes' : ordernotes});
}
}
