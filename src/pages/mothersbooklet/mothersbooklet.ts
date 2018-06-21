import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController } from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import 'rxjs/add/operator/map';
declare var require: any;
import { ViewChild } from '@angular/core';
import { Http , RequestOptions , Headers } from '@angular/http';
import { CommonModule } from '@angular/common';
import { DetailsPage } from '../../pages/details/details';
import { MenuController } from 'ionic-angular';
import { MothersBookletDetailPage } from '../../pages/mothersbookletdetail/mothersbookletdetail';
/**
 * Generated class for the MothersbookletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mothersbooklet',
  templateUrl: 'mothersbooklet.html',
})
export class MothersbookletPage {
  category: any;
  errorValue: string;
  resp: any;

  constructor(public navCtrl: NavController,public menuCtrl: MenuController,public loadingCtrl : LoadingController,public http: Http,public appsetting: Appsetting, public navParams: NavParams) {
    this.mothersproducts();
    this.menuCtrl.close();


  }

  public openMenu():void {
    this.menuCtrl.open();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MothersbookletPage');
  }
  mothersproducts(){

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loader.present();

    this.category = this.navParams.get('catname');

    if(this.category == "Mother's Day"){

      console.log(this.appsetting.myGlobalVar);
  
      this.http.get(this.appsetting.myGlobalVar + this.appsetting.home_mothersbooklet).map(result => 
        result.json()).subscribe(res => {
  
            
            console.log(res.msg);
            console.log(res.msg[0].images);
            
            if(res.status == 1) {

              loader.dismiss();
  
              this.errorValue = '2';
  
              this.resp = res.msg[0].images;
  
              console.log(this.resp);
  
            }else{

              loader.dismiss();
  
            }
  
        });
    }else if(this.category == "Recurring Monthly Payments"){

      console.log(this.appsetting.myGlobalVar);
  
      this.http.get(this.appsetting.myGlobalVar + this.appsetting.recurring_payments).map(result => 
        result.json()).subscribe(res => {
  
            this.appsetting.loader.dismiss();
            console.log(res.msg);
            console.log(res.msg[0].images);
            
            if(res.status == 1) {

              loader.dismiss();
  
              this.errorValue = '2';
  
              this.resp = res.msg[0].images;
  
              console.log(this.resp);
  
            }else{

              loader.dismiss();
  
            }
  
        });

    }else{

      loader.dismiss();

    }
  }


  details(subsdata,categoryname){
    console.log(subsdata);
    this.navCtrl.push(MothersBookletDetailPage,{'image' : subsdata,'cat_name':categoryname})
  }


}
