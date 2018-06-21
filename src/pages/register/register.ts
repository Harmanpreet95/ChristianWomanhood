import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,LoadingController, Nav } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import { CommonService } from '../../services/commonservice';
import { Http , RequestOptions , Headers } from '@angular/http';
import { MenuController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { LoginPage } from '../../pages/login/login';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  @ViewChild(Nav) nav: Nav;
  public value = '';
  constructor(public navCtrl: NavController,public loadingCtrl : LoadingController,public menuCtrl: MenuController,public http: Http,public appsetting: Appsetting, public navParams: NavParams,public toastCtrl: ToastController,public commonservice : CommonService) {
    
  }

  register(form){

    console.log(form.value);

    if(form.value.password != form.value.confirmpassword){

      let toast = this.toastCtrl.create({
        message: 'Password and ConfirmPassword do not match!Try Again!',
        duration: 3000
      });
      toast.present();

    }else{

      let loader = this.loadingCtrl.create({
        content: 'Please wait...'
      });
  
      loader.present();
      console.log(this.appsetting.myGlobalVar);

      console.log(this.appsetting.registerapi);

      let headers = new Headers();

      headers.append('Content-Type', 'application/json');

      let options = new RequestOptions({ headers: headers });

      let nonceurl = 'http://www.christianwomanhood.org' + '/api/get_nonce/?controller=user&method=register&insecure=cool';
      this.http.post(nonceurl,options)
      .map(result => result.json()).subscribe(data => {
      // console.log(data.nonce);
      // this.appsetting.loader.dismiss();
      let registrationurl = 'http://www.christianwomanhood.org' + '/api/user/register/';
      this.http.get(registrationurl + '?' + 'insecure=cool' + '&username='+ form.value.name +'&email='+ form.value.email +'&nonce='+ data.nonce +'&display_name='+ form.value.name +'&user_pass='+form.value.password)
      
      .map(result => 
          result.json()).subscribe(res => {
            loader.dismiss();
            console.log(res);
            if(res.status == 'ok'){
                  let toast = this.toastCtrl.create({
                    message: 'Registration Done Successfully!',
                    duration: 3000
                  });
                  toast.present();
                  form.reset();
                  
                 loader.dismiss();
            }else{

                  loader.dismiss();
                  let toast = this.toastCtrl.create({
                    message: 'Registration Not Done!Try Again',
                    duration: 3000
                  });
                  toast.present();
                  form.reset();

            }
          },err=>{
            loader.dismiss();
            console.log('err');
            console.log(err.json().error);
            let toast = this.toastCtrl.create({
              message: err.json().error,
              duration: 3000
            });
            toast.present();
          })
        })
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public openMenu():void {
    this.menuCtrl.open();
  }
  loginpage(){
    this.navCtrl.push(LoginPage);
  }
}
