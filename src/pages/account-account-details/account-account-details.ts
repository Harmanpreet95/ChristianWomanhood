import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController,LoadingController } from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import { Http , RequestOptions , Headers } from '@angular/http';
/**
 * Generated class for the AccountAccountDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-account-account-details',
  templateUrl: 'account-account-details.html',
})
export class AccountAccountDetailsPage {
  public value = '';
  public val = 0;
  constructor(public navCtrl: NavController,public loadingCtrl : LoadingController, public navParams: NavParams,public http: Http , public toastCtrl: ToastController,public appsetting: Appsetting) {

    this.accountdetails();

  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad AccountAccountDetailsPage');
  // }
  accountdetails(){

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loader.present();

    var userID = localStorage.getItem('token');
    
    this.http.get(this.appsetting.myGlobalVar + this.appsetting.show_accountDetails + '&user_id=' + userID).map(result => 
      result.json()).subscribe(res => {



        loader.dismiss();
        console.log(res);

        this.value =  res.msg[0];

        console.log(this.value);

        })

  }

  serializeObj(obj) {
    var result = [];

    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

  changeDetails(editForm){

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loader.present();

    if(editForm.value.new_password != editForm.value.confirmpass){

      loader.dismiss();

      let toast = this.toastCtrl.create({
        message:  'New Password and Confirm Password do not match!',
        duration: 3000
        });
        toast.present();

    }else{

    console.log(editForm.value);

    var userID = localStorage.getItem('token');

    var data = {

      name  : editForm.value.user_login,

      user_email : editForm.value.user_email,

      old_password : editForm.value.old_password,

      new_password : editForm.value.new_password,

    }
    let headers = new Headers();
    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });
    var Serialized = this.serializeObj(data);
    
    this.http.post(this.appsetting.myGlobalVar + this.appsetting.edit_accountDetails , Serialized , options).map(result => 

      result.json()).subscribe(res => {

        loader.dismiss();

        console.log(res);

        console.log(this.value);

        let toast = this.toastCtrl.create({
          message:  res.msg,
          duration: 3000
          });
          toast.present();

        })
      }
  }
}
