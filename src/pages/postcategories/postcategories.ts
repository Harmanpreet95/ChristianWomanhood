import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Http , RequestOptions , Headers } from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import { PostCategoryDetailPage } from '../../pages/post-category-detail/post-category-detail';
/**
 * Generated class for the PostcategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-postcategories',
  templateUrl: 'postcategories.html',
})
export class PostcategoriesPage {
  catID: any;
  public allposts = '';

  constructor(public navCtrl: NavController, public loadingCtrl : LoadingController , public navParams: NavParams,public menuCtrl: MenuController,public http: Http, public appsetting: Appsetting) {

    this.menuCtrl.close();
    this.ListByCat();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PostcategoriesPage');
  }
  public openMenu():void {
    this.menuCtrl.open();
  }

  ListByCat(){

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loader.present();

    this.catID = this.navParams.get('CatID');

    console.log(this.appsetting.myGlobalVar);

    console.log(this.appsetting.shop_latestProducts);

    this.http.get(this.appsetting.myGlobalVar + this.appsetting.post_categories + '&cat=' + this.catID).map(result => 
      result.json()).subscribe(res => {

          console.log(res);
          
          if(res.status == 1){

            loader.dismiss();

            this.allposts = res.msg;

            console.log(this.allposts);

          }

      });
  }

  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

  detail(pro_id){

    this.navCtrl.push(PostCategoryDetailPage,{'ProductID' : pro_id});

  }
}
