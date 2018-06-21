import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { ShopPage } from '../pages/shop/shop';
import { ContactPage } from '../pages/contact/contact';
import {googlemaps} from 'googlemaps';
import { ModalPage } from '../pages/modal/modal';
import { DetailsPage } from '../pages/details/details';
import { PaymentmethodPage } from '../pages/paymentmethod/paymentmethod';
import { SubscriptionsPage } from '../pages/subscriptions/subscriptions';
import { CwfridaysPage } from '../pages/cwfridays/cwfridays';
import { SubscriptionsDetailsPage } from '../pages/subscriptions-details/subscriptions-details';
import { MyAccountPage } from '../pages/my-account/my-account';
import { SettingsPage } from '../pages/settings/settings';
import { CheckoutReviewPaymentPage } from '../pages/checkout-review-payment/checkout-review-payment';
import { ForgotpasswordPage } from '../pages/forgotpassword/forgotpassword';
import { MyAccountyOrderPage } from '../pages/my-accounty-order/my-accounty-order';
import { AccountBillingAddressPage } from '../pages/account-billing-address/account-billing-address';
import { CheckoutShippingAddressPage } from '../pages/checkout-shipping-address/checkout-shipping-address';
import { CheckoutBillingAddressPage } from '../pages/checkout-billing-address/checkout-billing-address';
import { AccountBillingAddressEditPage } from '../pages/account-billing-address-edit/account-billing-address-edit';
import { AccountShippingAddressEditPage } from '../pages/account-shipping-address-edit/account-shipping-address-edit';
import { AccountAccountDetailsPage } from '../pages/account-account-details/account-account-details';
import { RegisterPage } from '../pages/register/register';
import { Appsetting } from '../providers/appsetting';
import { Http, Headers, RequestOptions } from '@angular/http';
import {HttpModule} from '@angular/http';
import { CommonService } from '../services/commonservice';
import { CommonModule } from '@angular/common';
import { ShopCategoryPage } from '../pages/shopcategory/shopcategory';
import { CartPage } from '../pages/cart/cart';
import { EvotaionsPage } from '../pages/evotaions/evotaions';
import { EvotionsDetailsPage } from '../pages/evotions-details/evotions-details';
import * as $ from 'jquery';
import { MothersbookletPage } from '../pages/mothersbooklet/mothersbooklet';
import { MeetlorettaPage } from '../pages/meetloretta/meetloretta';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { MothersBookletDetailPage } from '../pages/mothersbookletdetail/mothersbookletdetail';
import { AboutPage } from '../pages/about/about';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { PostcategoriesPage } from '../pages/postcategories/postcategories';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FrontCategoriesPage } from '../pages/front-categories/front-categories';
import { Geolocation } from '@ionic-native/geolocation';
import { CheckoutShippingDetailsPage } from '../pages/checkout-shipping-details/checkout-shipping-details';
import { PostCategoryDetailPage } from '../pages/post-category-detail/post-category-detail';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    DetailsPage,
    SubscriptionsDetailsPage,
    MyAccountPage,
    MyAccountyOrderPage,
    AccountBillingAddressPage,
    AccountBillingAddressEditPage,
    AccountShippingAddressEditPage,
    AccountAccountDetailsPage,
    ShopPage,
    EvotionsDetailsPage,
    SubscriptionsPage,
    CheckoutShippingAddressPage,
    CheckoutBillingAddressPage,
    CheckoutReviewPaymentPage,
    ForgotpasswordPage,
    MothersbookletPage,
    ShopCategoryPage,
    EvotaionsPage,
    MothersBookletDetailPage,
    PostcategoriesPage,
    PaymentmethodPage,
    CheckoutShippingDetailsPage,
    PostCategoryDetailPage,
    CartPage,
    CwfridaysPage,
    AboutPage,
    ContactPage,
    MeetlorettaPage,
    ModalPage,
   
    
    
    
    

  ],
  imports: [
    BrowserModule,
    HttpModule,
    CommonModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EvotaionsPage,
    LoginPage,
    ShopPage,
    EvotionsDetailsPage,
    DetailsPage,
    SubscriptionsDetailsPage,
    MyAccountPage,
    SubscriptionsPage,
    MyAccountyOrderPage,
    AccountBillingAddressPage,
    AccountBillingAddressEditPage,
    AccountShippingAddressEditPage,
    AccountAccountDetailsPage,
    CheckoutShippingAddressPage,
    CheckoutBillingAddressPage,
    CheckoutReviewPaymentPage,
    ForgotpasswordPage,
    MothersbookletPage,
    ShopCategoryPage,
    MothersBookletDetailPage,
    PostcategoriesPage,
    PaymentmethodPage,
    CheckoutShippingDetailsPage,
    PostCategoryDetailPage,
    CartPage,
    CwfridaysPage,
    AboutPage,
    ContactPage,
    MeetlorettaPage,
    ModalPage,
    
    
    


  ],
  providers: [
    StatusBar,
    SplashScreen,
    Appsetting,
    CommonService,
    PayPal,
    InAppBrowser,
    LaunchNavigator,
    Geolocation,
    InAppPurchase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
