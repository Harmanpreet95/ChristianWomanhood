import { Component , ViewChild} from '@angular/core';
import { Platform , Nav  ,Events } from 'ionic-angular';
import {googlemaps} from 'googlemaps';
import { CommonModule } from '@angular/common';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { DetailsPage } from '../pages/details/details';
import { SubscriptionsPage } from '../pages/subscriptions/subscriptions';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { CwfridaysPage } from '../pages/cwfridays/cwfridays';
import { SubscriptionsDetailsPage } from '../pages/subscriptions-details/subscriptions-details';
import { MyAccountPage } from '../pages/my-account/my-account';
import { SettingsPage } from '../pages/settings/settings';
import { MyAccountyOrderPage } from '../pages/my-accounty-order/my-accounty-order';
import { AccountBillingAddressPage } from '../pages/account-billing-address/account-billing-address';
import { AccountBillingAddressEditPage } from '../pages/account-billing-address-edit/account-billing-address-edit';
import { AccountShippingAddressEditPage } from '../pages/account-shipping-address-edit/account-shipping-address-edit';
import { AccountAccountDetailsPage } from '../pages/account-account-details/account-account-details';
import { RegisterPage } from '../pages/register/register';
import { CheckoutShippingAddressPage } from '../pages/checkout-shipping-address/checkout-shipping-address';
import { CheckoutBillingAddressPage } from '../pages/checkout-billing-address/checkout-billing-address';
import { PostcategoriesPage } from '../pages/postcategories/postcategories';
import { EvotionsDetailsPage } from '../pages/evotions-details/evotions-details';
import { ShopPage } from '../pages/shop/shop';
import { Appsetting } from '../providers/appsetting';
import { CartPage } from '../pages/cart/cart';
import { CommonService } from '../services/commonservice';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MeetlorettaPage } from '../pages/meetloretta/meetloretta';
import {HttpModule} from '@angular/http';
import { ModalPage } from '../pages/modal/modal';
import { FrontCategoriesPage } from '../pages/front-categories/front-categories';
import { ShopCategoryPage } from '../pages/shopcategory/shopcategory';
import { MothersbookletPage } from '../pages/mothersbooklet/mothersbooklet';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { MothersBookletDetailPage } from '../pages/mothersbookletdetail/mothersbookletdetail';
import { CheckoutShippingDetailsPage } from '../pages/checkout-shipping-details/checkout-shipping-details';
import { PostCategoryDetailPage } from '../pages/post-category-detail/post-category-detail';
declare var require: any;
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  public datamenu : any = '';
  public shopcategory : any = '';
  rootPage: any = HomePage;
  shownGroup = null;
  shownGroupsub = null;
  pages2: any;
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;
  showSubmenu: boolean = false;
  Submenu: boolean = false;
  constructor(platform: Platform,statusBar: StatusBar , public events: Events , public http: Http, splashScreen: SplashScreen) {


    this.http.get('http://www.christianwomanhood.org/API/apis.php?mode=post_cat').subscribe(data => {
      // alert("cat");
      console.log(data);
      console.log(data.json());
      this.datamenu = data.json();
      
    });
    this.shopcategories();

    events.subscribe('user:login', () => {
      this.http.get('http://www.christianwomanhood.org/API/apis.php?mode=post_cat').subscribe(data => {
        console.log(data);
        console.log(data.json());
        this.datamenu = data.json();
        // alert(JSON.stringify(this.datamenu));
        
      });
      this.shopcategories();
  });

    platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.pages2 = {
        loginpage : LoginPage 
      }

      this.http.get('http://www.christianwomanhood.org/API/apis.php?mode=post_cat').subscribe(data => {
        // alert("cat");
        console.log(data);
        console.log(data.json());
        this.datamenu = data.json();
        
      });
      this.shopcategories();
    });
    this.http.get('http://www.christianwomanhood.org/API/apis.php?mode=post_cat').subscribe(data => {
      // alert("cat");
      console.log(data);
      console.log(data.json());
      this.datamenu = data.json();
      
    });
    this.shopcategories();
  }
//  public menuItemHandler(): void {
//     this.showSubmenu = !this.showSubmenu;
//   }
//   public menuItem(): void {
//     this.Submenu = !this.Submenu;
//   }

shopcategories(){

  let headers = new Headers();
  headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
  let options= new RequestOptions({ headers: headers });
    this.http.post('https://www.christianwomanhood.org/API/apis.php?mode=cat_shop',options).subscribe(data => {
      // alert("cat1");
        console.log(data);
        console.log(data.json());
        this.shopcategory = data.json().msg;
        console.log(this.shopcategory);
    });
}


      toggleGroup(group) {
      
        if (this.isGroupShown(group)) {
        this.shownGroup = null;
        } else {
        this.shownGroup = group;
        }
        };
        isGroupShown(group) {
        return this.shownGroup === group;
        };





    toggleGroupsubs(group2) {
     
      if (this.isGroupShownsubs(group2)) {
      this.shownGroupsub = null;
      } else {
      this.shownGroupsub = group2;
      }
      };
      isGroupShownsubs(group2) {
      return this.shownGroupsub === group2;
      };

      myaccount(){
        console.log(localStorage.getItem('token'));
        if(localStorage.getItem('token') != null){
          this.nav.setRoot(MyAccountPage);
        }else{
           this.nav.setRoot(LoginPage);
        }       
      }
      Homepage(){
        this.nav.setRoot(HomePage);
      }

      public cat(catid,catname){

        if(catname == "Mother's Day" || catname == 'Recurring Monthly Payments'){
          console.log("yes");
          this.nav.setRoot(MothersbookletPage,{'catname' : catname});
        }else{

        console.log(catid);
        this.nav.setRoot(ShopCategoryPage, {'Category_ID' : catid,'Category_name':catname});

        }

      }

      subscription(){

        this.nav.setRoot(ShopPage,{ 'name' : 'subscription'});

      }

      loginfirst()
      {

        this.nav.setRoot(LoginPage);

      }

      categories(id){

        console.log(id);

        this.nav.setRoot(PostcategoriesPage,{'CatID' : id});

      }

      cwfridays(){

        this.nav.setRoot(CwfridaysPage);

      }
      about(){
        this.nav.setRoot(AboutPage);
      }
      public contact() : void{
        this.nav.setRoot(ContactPage);
      }

 
      MeetLoreta(){

        this.nav.setRoot(MeetlorettaPage);
        
      }
      

}

