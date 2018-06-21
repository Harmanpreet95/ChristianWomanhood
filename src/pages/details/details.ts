import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController , ModalController ,LoadingController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Appsetting } from '../../providers/appsetting';
import 'rxjs/add/operator/map';
declare var require: any;
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { Http , RequestOptions , Headers } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ModalPage } from '../../pages/modal/modal';
import { CheckoutBillingAddressPage } from '../../pages/checkout-billing-address/checkout-billing-address';
/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  imagesrc: any;
  @ViewChild(Slides) slides: Slides;
  public countitem = 0;
  public CATEGORY = '';
  public user_id = '';
  public productarray = [];
  public getarray = [];
  public value = 1;
  public catname = '';
  public productID = '';
  public singledata : any = '';
  public relatedData : any = '';
  public Cart_count : any = '';
  public ViewItems : any = [];
  public cartData = [];
  public price = '';
  public status = '';
  public  totalprice:any;
  public cartdata : any = '';
  public txnid = '';
  

  constructor(public navCtrl: NavController , public modalCtrl: ModalController, private payPal: PayPal , public http: Http , public appsetting: Appsetting , public navParams: NavParams , public loadingCtrl : LoadingController , public toastCtrl: ToastController) {

    this.value = 1;

    
  }

  ionViewDidLoad() {

    this.details();
    this.count();
    this.Relatedproducts();

  }

  serializeObj(obj) {
    var result = [];

    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }


  public subscribe_with_paypal(id,title,image,price,value){
    
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




    var alldata = {

      billing_first_name : '',
      billing_last_name  : '',
      billing_address_1 : '',
      billing_address_2 : '',
      billing_city : '',
      billing_state : '',
      billing_postcode : '',
      billing_country : '',
      billing_email : '',
      billing_phone : '',
      ucheck : '',
      upass : '',
      
      shipping_first_name : '',
      shipping_last_name : '',
      shipping_address_1 : '',
      shipping_address_2 : '',
      shipping_city : '',
      shipping_state : '',
      shipping_postcode : '',
      shipping_country : '' ,
      shipping_email : '',
      shipping_phone : '' ,
      
      paypal_transaction : this.txnid ,

      pay_status : this.status,
      
      payer_fname : '',
      payer_sname : '',
      payer_email : '',
      pay_type : 'Paypal',
      pay_tran_fee : price,
      product : {
        id : id,
        qty : 0
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
            message:  'Try Again',
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
  public subscribe(id,title,image,price,value){

    console.log(id);
    console.log(price);
    console.log(value);

    var pro_data = {

      pro_id : id, 
      pro_title : title,
      pro_image : image,
      pro_price : price,
      pro_value : value

    }

    localStorage.setItem('Product_data',JSON.stringify(pro_data));

    this.navCtrl.push(CheckoutBillingAddressPage);

  }


  public increaseValue(event) {

        console.log(event);

        event++;

        this.value = event;

  }

   public decreaseValue(event) {

      console.log(event);

      if(event <= 0){

        console.log("false");

      }else{

        event--;

        this.value = event;

      }
  }

  slideChanged():void {

    let currentIndex = this.slides.getActiveIndex();

    console.log('Current index is', currentIndex);

    }

    details(){

          console.log(this.navParams.get('cat'));
          this.CATEGORY = this.navParams.get('cat');

          let loader = this.loadingCtrl.create({
            content: 'Please wait...'
          });

          loader.present();

          this.catname = this.navParams.get('cat_name')

          console.log(this.navParams.get('productid'));

          this.productID = this.navParams.get('productid');

          this.http.get(this.appsetting.myGlobalVar + this.appsetting.shop_product_detail + '&ID=' + this.productID).map(result => result.json()).subscribe(res => {

              if(res.status == 1){

                  loader.dismiss();

                  console.log(res.msg[0]);

                  this.singledata = res.msg[0];

                  console.log(this.singledata.price);

              }else{

                loader.dismiss();

              }

              });
          }

          

    Relatedproducts(){

          let loader = this.loadingCtrl.create({
            content: 'Please wait...'
          });

          loader.present();
            
          console.log(this.navParams.get('productid'));
            
          this.productID = this.navParams.get('productid');
            
          this.http.get(this.appsetting.myGlobalVar + this.appsetting.shop_Related_Products + '&ID=' + this.productID).map(result => result.json()).subscribe(res => {

            if(res.status == 1){
            
                  loader.dismiss();
            
                  console.log(res);
            
                  this.relatedData = res.msg;

                  

            }else{
              
              loader.dismiss();
              
            }
            
          });
    }

    AddCart(proid,title,image,price,val){

      console.log(proid);

      console.log(val);

      this.user_id = localStorage.getItem('token');

      console.log(this.user_id);
  
      let loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
  
      loader.present();
  
      if(this.user_id != null){
  
      this.http.get(this.appsetting.myGlobalVar + this.appsetting.AddToCart+'&ID='+proid+'&pqty=1'+'&user_id='+ this.user_id).map(result => 
        result.json()).subscribe(res => {
  
            if(res.status == 1){
  
              loader.dismiss();
  
              console.log(res.msg);
  
              let toast = this.toastCtrl.create({
  
                message:  "Product Added to Cart",
  
                duration: 3000
  
              });
  
              toast.present();
  
            }else{
              loader.dismiss();
            }
  
          })
  
        }else{
  
          console.log("else");
  
          var data = {
    
            product_id : proid,
            product_title : title,
            product_image : image,
            price :  price,
            Qty : val
    
          }
    
          loader.dismiss();
  
          console.log(JSON.parse(localStorage.getItem('productdata')));
  
          if(JSON.parse(localStorage.getItem('productdata')) == null){
  
            this.productarray.push(data);
  
            localStorage.setItem('productdata',JSON.stringify(this.productarray));
    
            console.log(JSON.parse(localStorage.getItem('productdata')));
      
            let toast = this.toastCtrl.create({
        
              message:  "Product Added to Cart",
      
              duration: 3000
      
            });
      
            toast.present();
  
            this.count();
  
          }else{
  
             this.getarray = JSON.parse(localStorage.getItem('productdata'));
  
             this.getarray.push(data);
  
             localStorage.setItem('productdata',JSON.stringify(this.getarray));
  
             console.log(JSON.parse(localStorage.getItem('productdata')));
  
             this.count();
  
  
          }
    
  
  
        }

    }

    count(){

      var count = JSON.parse(localStorage.getItem('productdata'));
 
      console.log(count.length);
 
      this.countitem = count.length;
 
   }

    public productDetail(proID){

      let loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loader.present();

      this.http.get(this.appsetting.myGlobalVar + this.appsetting.shop_product_detail + '&ID=' + proID).map(result => result.json()).subscribe(res => {

        if(res.status == 1){

            loader.dismiss();

            console.log(res.msg[0]);

            this.singledata = res.msg[0];

            this.http.get(this.appsetting.myGlobalVar + this.appsetting.shop_Related_Products + '&ID=' + proID).map(result => result.json()).subscribe(res => {

              if(res.status == 1){
              
                    loader.dismiss();
              
                    console.log(res);
              
                    this.relatedData = res.msg;
  
              }else{
                
                loader.dismiss();
                
              }
              
            });

        }else{

          loader.dismiss();

        }

        });
    }

    
addCart(proid){
  console.log(proid);

  let loader = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  loader.present();

 

  var user_id = localStorage.getItem('token');

  this.http.get(this.appsetting.myGlobalVar + this.appsetting.AddToCart+'&ID='+proid+'&pqty=1'+'&user_id='+ user_id).map(result => 
    result.json()).subscribe(res => {

        if(res.status == 1){

          loader.dismiss();


          let toast = this.toastCtrl.create({

            message:  "Product Added to Cart",

            duration: 3000

          });

          toast.present();

        }else{
          loader.dismiss();
        }

      })


  }
}
