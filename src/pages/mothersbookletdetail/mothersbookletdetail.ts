import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController, MenuController , LoadingController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Appsetting } from '../../providers/appsetting';
import { CheckoutBillingAddressPage } from '../../pages/checkout-billing-address/checkout-billing-address';
import 'rxjs/add/operator/map';
declare var require: any;
import { Http , RequestOptions , Headers } from '@angular/http';
import { CommonModule } from '@angular/common';
import { PaymentmethodPage } from '../../pages/paymentmethod/paymentmethod';
import { DetailsPage } from '../../pages/details/details';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  
  selector: 'page-mothersbookletdetail',
  templateUrl: 'mothersbookletdetail.html',
})
export class MothersBookletDetailPage {
  opt: any;
  category: any;
  image: any;
  imagesrc: any;
  public allopt : any = '';
  public selectedDevice = '';
  @ViewChild(Slides) slides: Slides;

  public value = 0;
  public catname = '';
  public productID = '';
  public singledata : any = '';
  public relatedData : any = '';

  constructor(public navCtrl: NavController ,public toastCtrl: ToastController,public loadingCtrl : LoadingController,public menuCtrl: MenuController, public http: Http , public appsetting: Appsetting , public navParams: NavParams) {

    this.details();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  public openMenu():void {
    this.menuCtrl.open();
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

          let loader = this.loadingCtrl.create({
            content: 'Please wait...'
          });

          loader.present();

          this.category = this.navParams.get('cat_name');

          this.image = this.navParams.get('image');

          console.log(this.image);

          if(this.category == "Mother's Day"){

            this.http.get(this.appsetting.myGlobalVar + this.appsetting.home_mothersbooklet).map(result => result.json()).subscribe(res => {
  
                console.log(res);
  
                if(res.status == 1){
  
                    loader.dismiss();
  
                    console.log(res.msg[0]);
  
                    this.singledata = res.msg[0];
  
                    this.allopt = res.msg[0].options;
  
                }else{
  
                  loader.dismiss();
  
                }
  
            });
          }else if(this.category == "Recurring Monthly Payments"){

            this.http.get(this.appsetting.myGlobalVar + this.appsetting.recurring_payments).map(result => result.json()).subscribe(res => {
  
                console.log(res);
  
                if(res.status == 1){
  
                    loader.dismiss();
  
                    console.log(res.msg[0]);
  
                    this.singledata = res.msg[0];
  
                    this.allopt = res.msg[0].options;
  
                }else{
  
                  loader.dismiss();
  
                }
  
            });
          }else{
            loader.dismiss();
          }
      

          }

          // public Paymentmethod(){

          //   this.navCtrl.push(PaymentmethodPage);

          // }
          BillingMethod(selectedDevice,desc,image){
               console.log(selectedDevice);
               console.log(desc);
               console.log(image);
               var mothersBooklet = {

                    'Image' : image,
                    'desc' : desc,
                    'selectedDevice' : selectedDevice,
                    'title' : this.category
               }
               console.log(mothersBooklet);
               localStorage.setItem('mothersdayBooklet', JSON.stringify(mothersBooklet));
               this.navCtrl.push(CheckoutBillingAddressPage);
          }

          onChange(value) : void{
            console.log(value);
            this.selectedDevice = value;
          }

 public totalprice = '';

 public title = 'choose';

select(value,cat){

  if(cat != 'Recurring Monthly Payments'){


    console.log(value);
    this.title = value;
    var res = this.title.split(" ");
    console.log(res);
  
    var resp = res[2].split("$");
    console.log(resp);
  
    var price = resp[1].split(" ");
    console.log(price);
  
    console.log(price[0]);
  
    this.totalprice = price[0];

  }else{
    console.log(value);
    this.title = value;
    var res = this.title.split(" ");
    console.log(res);
  
    var resp = res[3].split("$");
    console.log(resp);
  
    var price = resp[1].split(" ");
    console.log(price);
  
    console.log(price[0]);
  
    this.totalprice = price[0];
  }



}

recurring(){

  if(this.title == 'choose'){

    let toast = this.toastCtrl.create({
      message:  'Select an Option To subscribe now!',
      duration: 3000
    });
    toast.present();


  }else{

  console.log(this.title);

  var pro_data = {

    pro_id : 523, 
    pro_title : this.title,
    pro_image : this.image,
    pro_price : this.totalprice,
    pro_value : '1'

  }

  localStorage.setItem('Product_data',JSON.stringify(pro_data));

  this.navCtrl.push(CheckoutBillingAddressPage);
  }
}

mothersbooklet()
{

  if(this.title == 'choose'){

    let toast = this.toastCtrl.create({
      message:  'Select an Option To subscribe now!',
      duration: 3000
    });
    toast.present();


  }else{
  var pro_data = {

    pro_id : 84546, 
    pro_title : this.title,
    pro_image : this.image,
    pro_price : this.totalprice,
    pro_value : '1'

  }
  console.log(pro_data);
  localStorage.setItem('Product_data',JSON.stringify(pro_data));

  this.navCtrl.push(CheckoutBillingAddressPage);
  }
}
}
