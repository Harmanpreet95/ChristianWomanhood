import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController , ModalController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController } from 'ionic-angular';
import { ModalPage } from '../../pages/modal/modal';
/**
 * Generated class for the PaymentmethodPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-paymentmethod',
  templateUrl: 'paymentmethod.html',
})
export class PaymentmethodPage {
  cart_title: any;
  public cartdata : any = '';
  public last12 = '';
  public last20 = '';
  public txnid = '';
  public price = '';
  public status = '';
  public  totalprice:any;

  public total :any = '';
  constructor(public navCtrl: NavController,public modalCtrl: ModalController,public http:Http, public navParams: NavParams,private alertCtrl: AlertController,private payPal: PayPal,public toastCtrl: ToastController) {

    // this.cartdata = JSON.parse(localStorage.getItem('mothersdayBooklet'));
    // console.log(this.cartdata);
    
    this.cartdata = JSON.parse(localStorage.getItem('Product_data'));
    console.log(this.cartdata);
    console.log(this.cartdata.pro_value); 
    console.log(this.cartdata.pro_price); 

    this.total = (this.cartdata.pro_price*this.cartdata.pro_value);
    console.log(this.total);



  }
  
  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad PaymentmethodPage');
  // }
  serializeObj(obj) {
    var result = [];

    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

  payment(title,price){

        console.log(price);
        this.totalprice = price.toString();
        console.log(this.totalprice);

        // alert("pay1111121112");
        this.cartdata = JSON.parse(localStorage.getItem('Product_data'));
    

        this.payPal.init({
        PayPalEnvironmentProduction: 'ATQU-fXabjRi1erj0-Pydg1zjuiNpBMZYrBGeX0zjxRa_ByyIlrKYMWEbpOjBZ7hbgqhdT-seH_x9Q43',
        PayPalEnvironmentSandbox:''
          }).then(() => {
            // alert("pay2");
        // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
        this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({
          // Only needed if you get an "Internal Service Error" after PayPal login!
          //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
        })).then(() => {
          // alert("pay3");
       
        let payment = new PayPalPayment(this.totalprice, 'USD', title, 'sale');
        console.log(payment);
        this.payPal.renderSinglePaymentUI(payment).then((data) => {

          console.log(data);
         
        // alert(data);

        // alert(JSON.stringify(data));
        // alert(JSON.stringify(data.response));

        this.txnid = data.response.id;
        this.status = data.response.state;
        // alert(this.txnid);
        // alert(this.status);
        // alert(JSON.stringify(this.txnid));




        var bill : any = JSON.parse(localStorage.getItem('BillingAddress(M&R)'));
        console.log(bill);
        var ship : any = JSON.parse(localStorage.getItem('ShippingAddress(M&R)'));
        console.log(ship);
    
    
    
        var alldata = {
    
          billing_first_name : bill.billing_first_name,
          billing_last_name  : bill.billing_last_name,
          billing_address_1 : bill.billing_address_1,
          billing_address_2 : bill.billing_address_2,
          billing_city : bill.billing_city,
          billing_state : bill.billing_state,
          billing_postcode : bill.billing_postcode,
          billing_country : bill.billing_country,
          billing_email : bill.billing_email,
          billing_phone : bill.billing_phone,
          ucheck : bill.ucheck,
          upass : bill.upass,
          
          shipping_first_name : ship.shipping_first_name ,
          shipping_last_name : ship.shipping_last_name,
          shipping_address_1 : ship.shipping_address_1,
          shipping_address_2 : ship.shipping_address_2,
          shipping_city : ship.shipping_city,
          shipping_state : ship.shipping_state,
          shipping_postcode : ship.shipping_postcode,
          shipping_country : ship.shipping_country ,
          shipping_email : ship.shipping_email,
          shipping_phone : ship.shipping_phone ,
          
          paypal_transaction : this.txnid ,

          pay_status : this.status,
          
          payer_fname : '',
          payer_sname : '',
          payer_email : '',
          pay_type : 'Paypal',
          pay_tran_fee : price,
          product : {
            id : this.cartdata.pro_id,
            qty : this.cartdata.pro_value
          }

    
    
    
        }

        console.log(alldata);
        // alert(JSON.stringify(alldata));

        // alert(alldata);
    
        var Serialized = this.serializeObj(alldata);
    
        this.http.get('https://www.christianwomanhood.org/API/apis.php?mode=create_order' , Serialized).map(result => 
          result.json()).subscribe(res => {
    
            console.log(res);

            // alert(JSON.stringify(res));

            if(res.status == 1){


              let profileModal = this.modalCtrl.create(ModalPage,{'totalPrice' : price , 'transacID' : this.txnid});
              profileModal.present();


            }else{
              let toast = this.toastCtrl.create({
                message:  'Failure',
                duration: 3000
                  });
                  toast.present();

            }

 


            
    
          })


                  
        },err=>{
          // alert(JSON.stringify(err));
          // alert("err");
          let toast = this.toastCtrl.create({
            message:  'Failure',
            duration: 3000
              });
            toast.present();
        })
     }, err => {
      let toast = this.toastCtrl.create({
        message:  'Failure',
        duration: 3000
          });
        toast.present();
      //  alert(JSON.stringify(err));
      //  alert("Error in configuration");
       // Error in configuration
     });
   }, err => {
    let toast = this.toastCtrl.create({
      message:  'Failure',
      duration: 3000
        });
      toast.present();
      // alert(JSON.stringify(err));
      // alert('Error in initialization, maybe PayPal isnt supported or something else');
   });
   }

}
