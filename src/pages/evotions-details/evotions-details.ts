import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController } from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import 'rxjs/add/operator/map';
declare var require: any;
import { Http , RequestOptions , Headers } from '@angular/http';
import { CommonModule } from '@angular/common';
/**
 * Generated class for the EvotionsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-evotions-details',
  templateUrl: 'evotions-details.html',
})
export class EvotionsDetailsPage {

  public allposts = '';

  constructor(public navCtrl: NavController , public http: Http , public appsetting: Appsetting , public navParams: NavParams , public loadingCtrl : LoadingController) {
    this.detailevotion();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EvotionsDetailsPage');
  }

  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

  detailevotion(){

    console.log(this.navParams.get('evotionID'));

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loader.present();

    var pro_id = this.navParams.get('evotionID');

    var data = {
      pid : pro_id
    }

    var Serialized = this.serializeObj(data); 

    console.log(this.appsetting.myGlobalVar);

    let headers = new Headers();
    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });

    this.http.post(this.appsetting.myGlobalVar + this.appsetting.singlepost_cat , Serialized , options).map(result => 
      result.json()).subscribe(res => {

          console.log(res);
          
          if(res.status == 1){

            loader.dismiss();

            this.allposts = res.msg[0];

            console.log(this.allposts);

          }

      });
  }
}
