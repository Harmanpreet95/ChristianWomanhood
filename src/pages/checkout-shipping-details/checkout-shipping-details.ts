import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , MenuController} from 'ionic-angular';
import { PaymentmethodPage } from '../../pages/paymentmethod/paymentmethod';
/**
 * Generated class for the CheckoutShippingDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-checkout-shipping-details',
  templateUrl: 'checkout-shipping-details.html',
})
export class CheckoutShippingDetailsPage {
  public value : any = '';
  public ordernote = '';
  constructor(public navCtrl: NavController, public menuCtrl: MenuController , public navParams: NavParams) {
    this.menuCtrl.close();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CheckoutShippingDetailsPage');
  }

  public openMenu():void {
    this.menuCtrl.open();
  }

  Shipping(ShippingForm){
    this.ordernote = this.navParams.get('orderNotes');
    console.log(this.ordernote);
    console.log(ShippingForm.value);
    var shippingdata = {

      shipping_first_name : ShippingForm.value.firstname ,
      shipping_last_name : ShippingForm.value.lastname,
      shipping_address_1 : ShippingForm.value.streetaddress,
      shipping_address_2 : ShippingForm.value.address2,
      shipping_city : ShippingForm.value.city,
      shipping_state : ShippingForm.value.state,
      shipping_postcode : ShippingForm.value.postcode,
      shipping_country : ShippingForm.value.country ,
      shipping_email : ShippingForm.value.email,
      shipping_phone : ShippingForm.value.phone 

  }
    let shippingdetail = Object.assign({}, shippingdata , { 'ordernotes' : this.ordernote });
    console.log(shippingdetail);
    localStorage.setItem('ShippingAddress(M&R)', JSON.stringify(shippingdetail));
    this.navCtrl.push(PaymentmethodPage);
  }
}
