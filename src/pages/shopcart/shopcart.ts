import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShopcartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopcart',
  templateUrl: 'shopcart.html',
})
export class ShopcartPage {

  public value = 0;

  public ViewItems = '';

  

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.ViewItems = JSON.parse(localStorage.getItem('ViewCart'));

    console.log(this.ViewItems);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopcartPage');
  }

  public increaseValue(event) {
    console.log(event);
    event++;
    this.value = event;
  }

  public decreaseValue(event) {
    console.log(event);
    if(event <= 0){
      console.log("false");
    }else{
      event--;
      this.value = event;
    }
  }
}
