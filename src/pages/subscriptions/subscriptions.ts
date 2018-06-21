import { Component } from '@angular/core';
import { Appsetting } from '../../providers/appsetting';
import 'rxjs/add/operator/map';
declare var require: any;
import { IonicPage, NavController, NavParams , LoadingController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Http , RequestOptions , Headers } from '@angular/http';
import { CommonModule } from '@angular/common';
import { SubscriptionsDetailsPage } from '../../pages/subscriptions-details/subscriptions-details';
/**
 * Generated class for the SubscriptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscriptions',
  templateUrl: 'subscriptions.html',
})
export class SubscriptionsPage {  
  searchList: any;
  name: any;
  resp: any;
  errorValue: string;
  public showstatus = 0;
  constructor(public navCtrl: NavController , public loadingCtrl : LoadingController , public http: Http,public appsetting: Appsetting, public menuCtrl: MenuController,public navParams: NavParams) {
    this.shopproducts();
  }
  public openMenu():void {
    this.menuCtrl.open();
  }
  ionViewDidLoad() {
    this.menuCtrl.close();
    console.log('ionViewDidLoad SubscriptionsPage');
  }
  public  details():void{
    this.navCtrl.push(SubscriptionsDetailsPage);
  }
  shopproducts(){
    

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

            loader.dismiss();

          }

      });
  }

  search(){

    this.showstatus = 1;

  }

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
}
