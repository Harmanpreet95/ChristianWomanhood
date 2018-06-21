import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController , ToastController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import { Http , RequestOptions , Headers } from '@angular/http';
import {googlemaps} from 'googlemaps';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
/**
 * Generated class for the ContactPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  public Contactdata = '';

  public currentaddress = '';

  public value = ''; 




  constructor(public navCtrl: NavController ,private geolocation: Geolocation,public http: Http, public appsetting: Appsetting, public loadingCtrl : LoadingController , public menuCtrl: MenuController,public navParams: NavParams , public toastCtrl: ToastController,private launchNavigator: LaunchNavigator)  {
   
    // this.google();

  


    // this.google();
    this.contact();

  }
  ionViewDidLoad() {

    this.menuCtrl.close();

    // this.google();
    // 
    console.log('ionViewDidLoad ContactPage');
  }

  google(){
    alert("SAd");
    
    this.geolocation.getCurrentPosition().then((resp) => {
      alert("1111");
      alert(resp.coords.latitude);
      var lat  = resp.coords.latitude;
      alert(lat);
      var long = resp.coords.longitude;
      alert(long);
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }


  public openMenu():void {
    this.menuCtrl.open();
  }

  contact(){

    let loader = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loader.present();

    console.log(this.appsetting.myGlobalVar);

    console.log(this.appsetting.contact_us);

    this.http.get(this.appsetting.myGlobalVar + this.appsetting.contact_us).map(result => 
      result.json()).subscribe(res => {

          console.log(res);
          
          if(res.status == 1){

            loader.dismiss();

            this.Contactdata = res.msg[0];

            console.log(this.Contactdata);

          }else{

            loader.dismiss();

          }

      });
  }

  serializeObj(obj) {
    var result = [];
    for (var property in obj)
      result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
  }

  contactus(contactForm){

    console.log(contactForm.value);

    var data = {
      cname : contactForm.value.name,
      cemail : contactForm.value.email,
      message : contactForm.value.message,
      csubject : contactForm.value.subject
    }


    var Serialized = this.serializeObj(data);


    this.http.post('https://www.christianwomanhood.org/API/apis.php?mode=contact_email' , Serialized).map(result => 
      result.json()).subscribe(res => {

       console.log(res);

       let toast = this.toastCtrl.create({
        message:  res.msg,
        duration: 3000
        });
        toast.present();

      })

  }

  showmap(mailing){

    // alert("harman");
    
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   alert("1111");
    //   alert(resp.coords.latitude);
    //   var lat  = resp.coords.latitude;
    //   alert(lat);
    //   var long = resp.coords.longitude;
    //   alert(long);
   

    // var latlng = new google.maps.LatLng(lat,long);

    // alert(latlng);

    // var geocoder = geocoder = new google.maps.Geocoder();

    // geocoder.geocode({ 'latLng': latlng }, function (results, status) {

    //   alert(JSON.stringify(results));

    //   alert("w");

    //     if (status == google.maps.GeocoderStatus.OK) {

    //         if (results[1]) {

    //             alert("Location: " + results[1].formatted_address);

    //             this.currentaddress = results[1].formatted_address;

    //             console.log(this.currentaddress);

                  // alert(mailing);

                  // alert(this.currentaddress);


                  let options: LaunchNavigatorOptions = {
                    start: '',
                    // app: 'ChristianWomanhood'
                  };
                  // alert("y");
                  this.launchNavigator.navigate(mailing,options)
                    .then(
                      success => {
                        // alert('succ');
                        // console.log('Launched navigator')
                        // alert("hghj");
                      },
                      error => {
                        // alert('error');
                        // console.log('Error launching navigator', error)
                        // alert(error);
                      }
                    );
  

  
// }
// })
  }
}
