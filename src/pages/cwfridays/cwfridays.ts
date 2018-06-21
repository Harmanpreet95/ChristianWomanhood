import { Component,Pipe, PipeTransform } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { Http , RequestOptions , Headers } from '@angular/http';
import { Appsetting } from '../../providers/appsetting';
import 'rxjs/add/operator/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {BrowserModule, DomSanitizer , SafeResourceUrl} from '@angular/platform-browser'

// import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

/**
 * Generated class for the CwfridaysPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Pipe({ name: 'safe' })
@IonicPage()
@Component({
  selector: 'page-cwfridays',
  templateUrl: 'cwfridays.html',
})
export class CwfridaysPage {
  iframe: any;

  public Cwfridaysdata:any = '';

  public htmldata = '';

  constructor(public navCtrl: NavController ,private iab: InAppBrowser ,  public loadingCtrl : LoadingController ,public http: Http, public appsetting: Appsetting, public menuCtrl: MenuController,public navParams: NavParams,private sanitizer: DomSanitizer) {
    // this.iframe = sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/_BFpylqipVo?wmode=transparent&autoplay=0");
    // console.log(this.iframe);
    this.Cwfridays();

  }

  // open(videos)


  // {
  //   alert("sdas12");


    // let options: StreamingVideoOptions = {
    //   successCallback: () => { 
    //     alert('Video played')
    //    },
    //   errorCallback: (e) => {
    //     alert(JSON.stringify(e));
    //     alert(e);
    //     alert('Error streaming')
    //    },
    //   orientation: 'landscape'
    // };

    // this.streamingMedia.playVideo(videos,options);
    // console.log(videos);
    // const browser = this.iab.create(videos);
    // this.youtube.openVideo(videos);
  // }


  public openMenu():void {
    this.menuCtrl.open();
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
    console.log('ionViewDidLoad CwfridaysPage');
  }
public itemsdata = [];
  Cwfridays(){

        let loader = this.loadingCtrl.create({
          content: 'Please wait...'
        });

        loader.present();

        console.log(this.appsetting.home_cwfridays);

        console.log(this.appsetting.myGlobalVar);
    
        this.http.get(this.appsetting.myGlobalVar + this.appsetting.home_cwfridays).map(result => 
            result.json()).subscribe(res => {
    
                loader.dismiss();
      
                  // if(res.status == 1){

                console.log(res);


                console.log(res.msg);

                for(var i = 0 ; i < res.msg.length ; i++){
                  console.log(res.msg[i]);
                  // this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(res.msg[i]);
                  this.iframe = this.sanitizer.bypassSecurityTrustResourceUrl(res.msg[i]);
                  this.itemsdata.push(this.iframe);
              

                 
                }
                console.log(this.itemsdata);
                this.Cwfridaysdata = this.itemsdata;
                console.log(this.Cwfridaysdata);
                
      
            });

  }

}
