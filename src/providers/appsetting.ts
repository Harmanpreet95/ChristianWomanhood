import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { LoadingController } from 'ionic-angular';
import { Http , RequestOptions , Headers } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the Appsetting provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Appsetting {
public  options;
  myGlobalVar: string ='http://www.christianwomanhood.org/';
  constructor(public http: Http,public loadingCtrl : LoadingController) {
    console.log('Hello Appsetting Provider');

    let headers = new Headers();
    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
    this.options= new RequestOptions({ headers: headers });
  }

  loader : any = this.loadingCtrl.create({
    content: 'Please wait...'
  });


  menu_cat : string = 'API/apis.php?mode=post_cat';

  home_cat : string  = 'API/apis.php?mode=blog_post';

  registerapi : string =  '/api/user/register/';

  registernonce : string =  'api/get_nonce/?controller=user&method=register&insecure=cool';

  login : string = 'API/apis.php?mode=login';

  forgotpassword : string = 'API/apis.php?mode=forgotpassword';

  shop_latestProducts : string = 'API/apis.php?mode=latest_products';

  home_subscription_plans : string = 'API/apis.php?mode=homepage_sub';

  all_shop_products : string = 'API/apis.php?mode=Subscription_list';

  shop_product_detail : string = 'API/apis.php?mode=single_product';

  shop_Related_Products : string = 'API/apis.php?mode=related_products';

  home_cwfridays : string = 'API/apis.php?mode=fridays';

  home_mothersbooklet : string = 'API/apis.php?mode=mothers_booklet';

  home_recurring : string = 'API/apis.php?mode=recurring';

  shop_categorybased : string = 'API/apis.php?mode=shop_cat';

  billing_address : string = 'API/apis.php?mode=billing_address';

  shipping_address : string = 'API/apis.php?mode=shipping_address';

  recurring_payments : string = 'API/apis.php?mode=recurring';

  post_categories : string = 'API/apis.php?mode=blog_post';

  singlepost_cat : string = 'API/apis.php?mode=single_post';

  evotions_post : string = 'API/apis.php?mode=all_post';

  cw_retreat : string = 'API/apis.php?mode=retreat';

  show_shipping_address : string = 'API/apis.php?mode=show_shipping_address';

  show_billing_address : string = 'API/apis.php?mode=show_billing_address';

  about_us : string = 'API/apis.php?mode=about_us';

  contact_us : string = 'API/apis.php?mode=contact_us';

  show_accountDetails : string = 'API/apis.php?mode=account_details';

  edit_accountDetails : string = 'API/apis.php?mode=changepassword';

  AddToCart : string = 'API/apis.php?mode=add_cart';

  viewCart : string = 'API/cart-api.php?mode=view_cart';

  removeCartItem : string =  'API/cart-api.php?mode=remove_cart';

  inspiring_quotes : string = 'API/apis.php?mode=inspiring_quotes';

}
