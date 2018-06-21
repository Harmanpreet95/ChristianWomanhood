import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController,ToastController , Nav } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { Appsetting } from '../../providers/appsetting';
import { Http , RequestOptions , Headers } from '@angular/http';
import { RegisterPage } from '../../pages/register/register';
import 'rxjs/add/operator/map';
import { ForgotpasswordPage } from '../../pages/forgotpassword/forgotpassword';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @ViewChild(Nav) nav: Nav;
  public value = '';
  constructor(public navCtrl: NavController ,public loadingCtrl : LoadingController, public http: Http,public navParams: NavParams,public menuCtrl: MenuController,public appsetting: Appsetting,public toastCtrl: ToastController) {
  }
  serializeObj(obj) {
    var result = [];

    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }
  ionViewDidLoad() {
    this.menuCtrl.close();
    console.log('ionViewDidLoad LoginPage');
  }
 
  login(form) {

    
    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loader.present();

    console.log(this.appsetting.myGlobalVar);

    this.http.get(this.appsetting.myGlobalVar + this.appsetting.login + '&username=' + form.value.email + '&password=' + form.value.password).map(result => 
    result.json()).subscribe(res => {

      

      console.log(res);

     

      if(res.status == 1){
        loader.dismiss();

        let toast = this.toastCtrl.create({
              message:  res.info[0].msg,
              duration: 3000
        });
        toast.present();

        localStorage.setItem('token',res.info[0].user_id);

        console.log(localStorage.getItem('token'));

        form.reset();

        this.navCtrl.push(HomePage);

      }else{
        loader.dismiss();

        let toast = this.toastCtrl.create({
          message:  res.msg,
          duration: 3000
        });
        toast.present();

      }
    },err=>{

        loader.dismiss();

        console.log(err);

        let toast = this.toastCtrl.create({
          message:  err,
          duration: 3000
        });
        toast.present();

      })
  }


  public openMenu():void {
    this.menuCtrl.open();
  }

  registerpage(){
    this.navCtrl.push(RegisterPage);
  }

  resetpassword(){

    this.navCtrl.push(ForgotpasswordPage);

  }
}
