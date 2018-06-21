import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController } from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import { Http , RequestOptions , Headers } from '@angular/http';
/**
 * Generated class for the AccountShippingAddressEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-shipping-address-edit',
  templateUrl: 'account-shipping-address-edit.html',
})
export class AccountShippingAddressEditPage {
  public value : any = '';
  constructor(public navCtrl: NavController,public appsetting: Appsetting, public navParams: NavParams,public http: Http , public toastCtrl: ToastController) {
  
    this.fetchaddressshipping();
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountShippingAddressEditPage');
  }

  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }



  Shipping(ShippingForm){

    var userID = localStorage.getItem('token');

    console.log(ShippingForm.value);

    console.log(this.appsetting.billing_address);

    this.appsetting.loader.present();

    console.log(this.appsetting.myGlobalVar);
    
    var billingdata = {
      ID : userID,
      first_name : ShippingForm.value.firstname,
      second_name : ShippingForm.value.lastname,
      address_1 : ShippingForm.value.address1,
      city : ShippingForm.value.city,
      state : ShippingForm.value.state,
      postcode : ShippingForm.value.postcode,
      country : ShippingForm.value.country,
      email : ShippingForm.value.email,
      phone : ShippingForm.value.phone,
      company : ShippingForm.value.company,
      address_2 : ShippingForm.value.address2
    }

    var Serialized = this.serializeObj(billingdata);

    this.http.post(this.appsetting.myGlobalVar + this.appsetting.billing_address , Serialized).map(result => 
    result.json()).subscribe(res => {

      console.log(res);

      if(res.status == 1){
        this.appsetting.loader.dismiss();

        let toast = this.toastCtrl.create({
              message:  res.msg,
              duration: 3000
        });
        toast.present();
        ShippingForm.reset();

      }else{
        this.appsetting.loader.dismiss();

        let toast = this.toastCtrl.create({
          message:  res.msg,
          duration: 3000
        });
        toast.present();

      }
    },err=>{

        this.appsetting.loader.dismiss();

        console.log(err);

        let toast = this.toastCtrl.create({
          message:  err,
          duration: 3000
        });
        toast.present();

      })

  }

  fetchaddressshipping(){

    var userID = localStorage.getItem('token');
    
    this.http.get(this.appsetting.myGlobalVar + this.appsetting.show_shipping_address + '&userid=' + userID).map(result => 
      result.json()).subscribe(res => {

        console.log(res);

        this.value = res.msg[0];


      })
  }
}
