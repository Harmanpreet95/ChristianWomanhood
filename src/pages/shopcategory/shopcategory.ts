import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController , LoadingController } from 'ionic-angular';
import { MenuController , Platform} from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import 'rxjs/add/operator/map';
declare var require: any;
import { DetailsPage } from '../../pages/details/details';
import { ViewChild } from '@angular/core';
import { Http , RequestOptions , Headers } from '@angular/http';
import { CommonModule } from '@angular/common';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
// const Digital = 'com.3gInfo.Christianwomanhood.digital';
// const Printed = 'com.3gInfo.Christianwomanhood.printed';
//const GAMEMODE_KEY = 'com.3gInfo.Christianwomanhood.specialgamemode';
/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopcategory',
  templateUrl: 'shopcategory.html',
})
export class ShopCategoryPage {
  public cat_name = '';
  public shop: any = '';
  public showstatus = 0;
  public name= ''; 
  public errorValue = '';
  public searchList = '';
  public resp:any;
  

  constructor(public navCtrl: NavController,private iap: InAppPurchase,public http: Http,public appsetting: Appsetting, public  menuCtrl: MenuController, public loadingCtrl : LoadingController , public navParams: NavParams,public toastCtrl: ToastController, private plt: Platform) {
    // var productIds = [

    //   'com.3gInfo.Christianwomanhood.digital','com.3gInfo.Christianwomanhood.printed'

    // ];

    // console.log(productIds);

   this.shopcategoryproducts();
  
   
  //    this.iap.getProducts(['com.3gInfo.Christianwomanhood.bulk'])
  //     .then((products) => {
  //       alert("wqw1");
  //       alert(products);
  //       alert("21");
  //       console.log("Products1");
  //       alert(JSON.stringify(products));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  // });

  }

  public openMenu():void {
    this.menuCtrl.open();
  }
  ionViewDidLoad() {
    this.menuCtrl.close();
    console.log('ionViewDidLoad ShopPage');
  }

 public details(proid,category):void{
    console.log(category);
    this.navCtrl.push(DetailsPage,{'productid' : proid,'cat':category});
  }


   /***************************List Products**************************/

   shopcategoryproducts(){

          let loader = this.loadingCtrl.create({
            content: 'Please wait...'
          });

          loader.present();

          var cat_id = this.navParams.get('Category_ID');

          this.cat_name = this.navParams.get('Category_name');
    
          console.log(this.appsetting.myGlobalVar);
    
          this.http.get(this.appsetting.myGlobalVar + this.appsetting.shop_categorybased+'&cat='+ cat_id).map(result => 
            result.json()).subscribe(res => {
    
                console.log(res);


                
                if(res.status == 1) {

                  loader.dismiss();

                  this.errorValue = '2';
    
                  for(var i=0;i<res.msg.length;i++){

                    if(res.msg[i].product_title == 'One Year Printed Subscription'){
                      
                      console.log(res.msg[i].product_title);
                      
                      res.msg[i].product_title = 'One Year Subscription';
                      
                      console.log(res.msg);
                      
                      this.resp = res.msg;

                      console.log(this.resp);

                    }else{
                      
                      console.log("else");
                    }
                  }

                  if(this.resp == ''){
                    let toast = this.toastCtrl.create({
                      message:  "No Data",
                      duration: 3000,
                      position : 'center'
                    });
                    toast.present();
                  }
    
                }else{

                  loader.dismiss();

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

  addtocart(proid){
    
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loader.present();

    var user_id = localStorage.getItem('token');

    this.http.get(this.appsetting.myGlobalVar + this.appsetting.AddToCart+'&ID='+proid+'&pqty=1'+'&user_id='+ user_id).map(result => 
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
  }

  /************************FILTER ITEMS******************************/

}
