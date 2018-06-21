import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController , Nav } from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import { Http , RequestOptions , Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginPage } from '../../pages/login/login';
/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {
  public value = '';
  constructor(public navCtrl: NavController, public http: Http , public navParams: NavParams,public appsetting: Appsetting,public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

  reset(form) {
    
        this.appsetting.loader.present();
    
        console.log(this.appsetting.myGlobalVar);
    
        this.http.get(this.appsetting.myGlobalVar + this.appsetting.forgotpassword + '&user_email=' + form.value.email).map(result => 
        result.json()).subscribe(res => {
    
          this.appsetting.loader.dismiss();
    
          console.log(res);
    
          if(res.status == 1){
    
            let toast = this.toastCtrl.create({
                  message:  res.msg,
                  duration: 3000
            });
            toast.present();
   
            form.reset();
    
          }else{
    
            let toast = this.toastCtrl.create({
              message:  res.msg,
              duration: 3000
            });
            toast.present();
    
          }
        },err=>{
    
            this.appsetting.loader.dismiss();
    
            console.log(err);
    
            let toast = this.toastCtrl.create({
              message:  err,
              duration: 3000
            });
            toast.present();
    
          })
      }

  login(){
    this.navCtrl.push(LoginPage);
  }
}
