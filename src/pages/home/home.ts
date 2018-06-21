import { Component } from '@angular/core';
import { NavController , Events , LoadingController , ToastController} from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
import { MenuController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Http , RequestOptions , Headers } from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import 'rxjs/add/operator/map';
import { ShopPage } from '../../pages/shop/shop';
declare var require: any;
import { MothersbookletPage } from '../../pages/mothersbooklet/mothersbooklet';
import { CartPage } from '../../pages/cart/cart';
import { DetailsPage } from '../../pages/details/details';
import { EvotaionsPage } from '../../pages/evotaions/evotaions';
import { CwfridaysPage } from '../../pages/cwfridays/cwfridays';
import { FrontCategoriesPage } from '../../pages/front-categories/front-categories';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  datapro: string;
  title = 'PayPal Test';
  public Dvictoken = '';
  public user_id = '';
  public shopcategory= '';
  public thought = '';
  public countitem = '';
  public productarray = [];
  @ViewChild(Slides) slides: Slides;
  public items : any = '';
  public subscribed_products : any = '';
  constructor(public navCtrl: NavController,public toastCtrl: ToastController,public loadingCtrl : LoadingController,public http: Http, public appsetting: Appsetting , public events: Events , public menuCtrl: MenuController) {
      
      this.shopcategories();

      this.shopproducts();

      this.subscriptionproducts();
      
      // this.notification();
      events.publish('user:login');

      this.thoughts();

      this.menuCtrl.close();

     
  }

  public shopcategories(){
    let headers = new Headers();
    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });
    this.http.post('https://www.christianwomanhood.org/API/apis.php?mode=cat_shop',options).subscribe(data => {
        console.log(data);
        console.log(data.json());
        this.shopcategory = data.json().msg;
        console.log(this.shopcategory);
    });
}

  ionViewDidLoad() {


    this.events.publish('user:login');

    this.shopproducts();

    this.subscriptionproducts();

    // this.count();

    // this.thoughts();


    this.menuCtrl.close();
  }

//   notification() {
//     alert('notify');
//     // console.log("login")
//     this.firebase.onTokenRefresh()
//       .subscribe((token: string) => console.log(`Got a new token ${token}`));

//     this.firebase.getToken()
//       .then((token) => {
//         alert("token")
//         console.log('token retrieved ' + token)
//         alert('token'+token);
//         this.Dvictoken = token;
//         //console.log(signup);
//         console.log('dvcToken' + this.Dvictoken);
//   });
// }

thoughts(){

  
  this.http.get(this.appsetting.myGlobalVar + this.appsetting.inspiring_quotes).map(result => 
    result.json()).subscribe(res => {

      console.log(res);

      if(res.msg == ''){


      }else{

      this.thought = res.msg[0].post_title;

      }


    })


}
    cwfridays(){

      this.navCtrl.push(CwfridaysPage);

    }


    public openMenu():void {

      this.menuCtrl.open();

    }

    slideChanged():void {

      let currentIndex = this.slides.getActiveIndex();
      console.log('Current index is', currentIndex);

    }

    shopproducts(){

      let loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });

      loader.present();

      console.log(this.appsetting.myGlobalVar);

      console.log(this.appsetting.shop_latestProducts);

      this.http.get(this.appsetting.myGlobalVar + this.appsetting.shop_latestProducts).map(result => 
        result.json()).subscribe(res => {

            console.log(res);
            
            if(res.status == 1){

              loader.dismiss();

              this.items = res.msg;

              console.log(this.items);

            }else{

              loader.dismiss();

            }
  
        });
    }

    subscriptionproducts(){
      
            let loader = this.loadingCtrl.create({
              content: 'Please wait...'
            });

            loader.present();
      
            this.http.get(this.appsetting.myGlobalVar + this.appsetting.home_subscription_plans).map(result => 
              result.json()).subscribe(res => {
      
                  if(res.status == 1){

                    loader.dismiss();

                    console.log(res.msg);

                    console.log(res.msg.pop());

                    var response_subscription = res.msg;

                    this.subscribed_products = response_subscription;
      
                    console.log(this.subscribed_products);
      
                  }
        
              });
          }

  Allproducts(){

    this.navCtrl.push(ShopPage,{'name':'shop'});

  }

  Evotions(){

    this.navCtrl.push(EvotaionsPage);

  }

  // cart(){

  //   console.log('cart');
  //   this.navCtrl.push(CartPage);

  // }

  detail(productID){

    this.navCtrl.push(DetailsPage,{'productid': productID});

  }
  cat(id){

    console.log(id);
    this.navCtrl.push('FrontCategoriesPage',{'catid':id})

  }
//   count(){

//     var count = JSON.parse(localStorage.getItem('productdata'));

//     console.log(count.length);

//     this.countitem = count.length;

//  }


//  public getarray = [];


//   addtocart(proid,title,image,price){

//     this.user_id = localStorage.getItem('token');

//     console.log(this.user_id);

//     let loader = this.loadingCtrl.create({
//       content: 'Please wait...'
//     });

//     loader.present();

//     if(this.user_id != null || this.user_id != undefined){

//       // var user_id = localStorage.getItem('token');
//       this.http.get(this.appsetting.myGlobalVar + this.appsetting.AddToCart+'&ID='+proid+'&pqty=1'+'&user_id='+ this.user_id).map(result => 
//         result.json()).subscribe(res => {
  
//             if(res.status == 1){
  
//               loader.dismiss();
  
//               let toast = this.toastCtrl.create({
  
//                 message:  "Product Added to Cart",
  
//                 duration: 3000
  
//               });
  
//               toast.present();
  
//             }else{
//               loader.dismiss();
//             }
  
//           })

//     }else{




  //     console.log("else");

  //     var data = {

  //       product_id : proid,
  //       product_title : title,
  //       product_image : image,
  //       price :  price,
  //       Qty : '1'

  //     }

  //     loader.dismiss();

  //     console.log(JSON.parse(localStorage.getItem('productdata')));

  //     if(JSON.parse(localStorage.getItem('productdata')) == null){

  //       this.productarray.push(data);

  //       localStorage.setItem('productdata',JSON.stringify(this.productarray));

  //       console.log(JSON.parse(localStorage.getItem('productdata')));
  
  //       let toast = this.toastCtrl.create({
    
  //         message:  "Product Added to Cart",
  
  //         duration: 3000
  
  //       });
  
  //       toast.present();

  //       this.count();

  //     }else{


  //        this.getarray = JSON.parse(localStorage.getItem('productdata'));

  //        for(var i = 0 ; i < this.getarray.length ; i++){

  //             if(this.getarray[i].product_id == proid){

  //                 alert("already in cart");

  //                 break;

  //             }

  //        }

  //        this.getarray.push(data);

  //        localStorage.setItem('productdata',JSON.stringify(this.getarray));

  //        console.log(JSON.parse(localStorage.getItem('productdata')));

  //        this.count();


  //     }

  //   }




  //  }
}

