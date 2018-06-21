import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import { Http , RequestOptions , Headers } from '@angular/http';
import 'rxjs/add/operator/map';
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  public aboutdata = '';

  constructor(public navCtrl: NavController,public loadingCtrl : LoadingController, public menuCtrl: MenuController,public navParams: NavParams,public http: Http, public appsetting: Appsetting) {
  
    this.about();
  
  }
   openMenu():void {
    this.menuCtrl.open();
  }
  ionViewDidLoad() {
    this.menuCtrl.close();
    console.log('ionViewDidLoad AboutPage');
  }

  about(){

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loader.present();

    console.log(this.appsetting.myGlobalVar);

    console.log(this.appsetting.about_us);

    this.http.get(this.appsetting.myGlobalVar + this.appsetting.about_us).map(result => 
      result.json()).subscribe(res => {

          console.log(res);
          
          if(res.status == 1){

            loader.dismiss();

            this.aboutdata = res.msg[0].desc;

            console.log(this.aboutdata);

          }else{

            loader.dismiss();

          }

      });
  }
}
