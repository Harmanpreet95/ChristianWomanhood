import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController } from 'ionic-angular';
import { MenuController , LoadingController } from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import 'rxjs/add/operator/map';
declare var require: any;
import { DetailsPage } from '../../pages/details/details';
import { ViewChild } from '@angular/core';
import { Http , RequestOptions , Headers } from '@angular/http';
import { CommonModule } from '@angular/common';
import { CartPage } from '../../pages/cart/cart';
/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  type: any;

  public shop: any = '';
  public showstatus = 0;
  public name= ''; 
  public errorValue = '';
  public searchList = '';
  public resp:any;
  public ViewItems : any = [];
  public cartData = [];
  public countitem = 0;

  constructor(public navCtrl: NavController,public loadingCtrl : LoadingController,public http: Http,public appsetting: Appsetting, public  menuCtrl: MenuController,public navParams: NavParams, public toastCtrl: ToastController) {
   
    this.shopproducts();

    // this.count();

    // this.ViewItems = JSON.parse(localStorage.getItem('ViewCart'));

    // console.log(this.ViewItems);
  }

  public openMenu():void {

    this.menuCtrl.open();
  }

  ionViewDidLoad() {

    this.menuCtrl.close();

    console.log('ionViewDidLoad ShopPage');

  }

 public  details(proid):void{

    this.navCtrl.push(DetailsPage,{'productid' : proid});

  }


   /***************************List Products**************************/

   shopproducts(){

          console.log(this.navParams.get('name'));

          this.type = this.navParams.get('name')

          let loader = this.loadingCtrl.create({
            content: 'Please wait...'
          });
    
          loader.present();
    
          console.log(this.appsetting.myGlobalVar);
    
          this.http.get(this.appsetting.myGlobalVar + this.appsetting.all_shop_products).map(result => 
            result.json()).subscribe(res => {
    
                console.log(res);
                
                if(res.status == 1) {

                  loader.dismiss();

                  this.errorValue = '2';
    
                  this.resp = res.msg;
    
                  console.log(this.resp);
    
                }else{

                }
      
            });
        }
    
     /***************************List Products**************************/

  search(){

    this.showstatus = 1;

  }

  /***************************FILTER ITEMS**************************/

  setFilteredItems(){
        if(this.name.length == 0) {

          this.errorValue = '2'; 

          console.log(this.errorValue);

        } else {

        this.searchList = this.filterItems(this.name);

        this.errorValue = '0';

        console.log(this.errorValue);

        }
   }

  public filterItems(searchTerm){
        console.log(searchTerm);

        return this.resp.filter((productslist) => {

          console.log(productslist);

            return productslist.product_title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;

        });   
  }

  /************************Add To Cart******************************/
  // public user_id = '';

  // public productarray = [];

  // public getarray = [];

  // addtocart(proid,title,image,price){

  //   this.user_id = localStorage.getItem('token');

  //   console.log(this.user_id);

  //   let loader = this.loadingCtrl.create({
  //     content: 'Please wait...'
  //   });

  //   loader.present();

  //   if(this.user_id != null){

  //   this.http.get(this.appsetting.myGlobalVar + this.appsetting.AddToCart+'&ID='+proid+'&pqty=1'+'&user_id='+ this.user_id).map(result => 
  //     result.json()).subscribe(res => {

  //         if(res.status == 1){

  //           loader.dismiss();

  //           console.log(res.msg);

  //           let toast = this.toastCtrl.create({

  //             message:  "Product Added to Cart",

  //             duration: 3000

  //           });

  //           toast.present();

  //         }else{
  //           loader.dismiss();
  //         }

  //       })

  //     }else{

  //       console.log("else");

  //       var data = {
  
  //         product_id : proid,
  //         product_title : title,
  //         product_image : image,
  //         price :  price,
  //         Qty : '1'
  
  //       }
  
  //       loader.dismiss();

  //       console.log(JSON.parse(localStorage.getItem('productdata')));

  //       if(JSON.parse(localStorage.getItem('productdata')) == null){

  //         this.productarray.push(data);

  //         localStorage.setItem('productdata',JSON.stringify(this.productarray));
  
  //         console.log(JSON.parse(localStorage.getItem('productdata')));
    
  //         let toast = this.toastCtrl.create({
      
  //           message:  "Product Added to Cart",
    
  //           duration: 3000
    
  //         });
    
  //         toast.present();

  //         this.count();

  //       }else{

  //          this.getarray = JSON.parse(localStorage.getItem('productdata'));

  //          this.getarray.push(data);

  //          localStorage.setItem('productdata',JSON.stringify(this.getarray));

  //          console.log(JSON.parse(localStorage.getItem('productdata')));

  //          this.count();


  //       }
  


  //     }

  // }
  // cart(){
  //   console.log('cart');
  //   this.navCtrl.push(CartPage);
  // }

  // count(){

  //    var count = JSON.parse(localStorage.getItem('productdata'));

  //    console.log(count.length);

  //    this.countitem = count.length;

  // }
}
