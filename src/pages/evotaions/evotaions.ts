import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController } from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import 'rxjs/add/operator/map';
declare var require: any;
import { Http , RequestOptions , Headers } from '@angular/http';

import { EvotionsDetailsPage } from '../../pages/evotions-details/evotions-details';
/**
 * Generated class for the EvotaionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-evotaions',
  templateUrl: 'evotaions.html',
})
export class EvotaionsPage {
  public searchList = '';
  public allevotions = '';
  public showstatus = 0;
  public errorValue = '';
  public name= '';
  public resp:any;
  public evotionslist = '';
  constructor(public navCtrl: NavController, public navParams: NavParams , public loadingCtrl : LoadingController ,public http: Http , public appsetting: Appsetting) {
    this.evotionsList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EvotaionsPage');
  }


  evotionsList(){
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loader.present();
    
    console.log(this.appsetting.myGlobalVar);

    this.http.get(this.appsetting.myGlobalVar + this.appsetting.evotions_post).map(result => 
      result.json()).subscribe(res => {

          console.log(res);
          
          if(res.status == 1){

            this.errorValue = '2';

            loader.dismiss();

            this.resp = res.msg;

            console.log(this.resp);

          }else{

            loader.dismiss();

          }
        });
  }

  detail(evotionID){
    this.navCtrl.push(EvotionsDetailsPage,{'evotionID' : evotionID});
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

        return productslist.post_title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;

    });   
}
// viewmore(){
//   this.evotionsList();
// }
}
