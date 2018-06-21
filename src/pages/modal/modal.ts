  import { Component } from '@angular/core';
  import { NavController , Events , NavParams} from 'ionic-angular';
  import {Http, Headers, RequestOptions} from '@angular/http';
  import {LoadingController} from 'ionic-angular';
  import { ToastController } from 'ionic-angular';
  import { AlertController } from 'ionic-angular';
  import { HomePage } from '../home/home';
  @Component({
    selector: 'page-modal',
    templateUrl: 'modal.html'
  })
  export class ModalPage {


  public price = '';

  public tranxID = '';
  public order_ID= '';

    constructor(public navCtrl: NavController,public navParams: NavParams,public events : Events ,public http: Http) {

      this.price  = this.navParams.get('totalPrice');

      console.log(this.price);

      this.tranxID = this.navParams.get('transacID'); 

      console.log(this.tranxID);

      this.order_ID = this.navParams.get('orderID'); 

      console.log(this.order_ID);

      
         
    }
  dismiss(){

    this.navCtrl.push(HomePage);
  }
  
 
}
