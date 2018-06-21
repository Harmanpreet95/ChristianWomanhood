import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController } from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import { Http , RequestOptions , Headers } from '@angular/http';
/**
 * Generated class for the AccountBillingAddressEditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-billing-address-edit',
  templateUrl: 'account-billing-address-edit.html',
})
export class AccountBillingAddressEditPage {
  public value : any = '';
  constructor(public navCtrl: NavController,public appsetting: Appsetting, public navParams: NavParams,public http: Http , public toastCtrl: ToastController) {
    this.fetchaddressbilling();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountBillingAddressEditPage');
  }

  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

  Billing(BillingForm){

    console.log(BillingForm);

    var userID = localStorage.getItem('token');

    console.log(BillingForm.value);

    console.log(this.appsetting.billing_address);

    this.appsetting.loader.present();

    console.log(this.appsetting.myGlobalVar);
    
    var billingdata = {
      ID : userID, 
      first_name : BillingForm.value.first_name,
      second_name : BillingForm.value.last_name,
      address_1 : BillingForm.value.address_1,
      city : BillingForm.value.city,
      state : BillingForm.value.state,
      postcode : BillingForm.value.postcode,
      country : BillingForm.value.country,
      email : BillingForm.value.email,
      phone : BillingForm.value.phone,
      company : BillingForm.value.company,
      address_2 : BillingForm.value.address_2
    }

    console.log(billingdata);
    
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
        BillingForm.reset();

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


  fetchaddressbilling(){

    var userID = localStorage.getItem('token');
    
    this.http.get(this.appsetting.myGlobalVar + this.appsetting.show_billing_address + '&userid=' + userID).map(result => 
      result.json()).subscribe(res => {

        console.log(res);

        this.value =  res.msg[0];

        console.log(this.value);

        })

    
     }
}
