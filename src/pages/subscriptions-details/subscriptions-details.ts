import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SubscriptionsDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscriptions-details',
  templateUrl: 'subscriptions-details.html',
})
export class SubscriptionsDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  public value = 0;
  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionsDetailsPage');
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
