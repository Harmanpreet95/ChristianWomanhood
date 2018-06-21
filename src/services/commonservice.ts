import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Appsetting } from '../providers/appsetting';
/*
  Generated class for the Appsetting provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CommonService {


 myGlobalVar: string ='https://truelabllc.com/truelab/api/';
  constructor(public http: Http,public appsetting : Appsetting) {
    console.log('Hello Appsetting Provider');
  }


  getRegistrationNonce() {

    console.log(this.appsetting.options);

    let nonceurl = this.appsetting.myGlobalVar + this.appsetting.registernonce;

    this.http.post(nonceurl,this.appsetting.options)

    .map(result => result.json()).subscribe(data => {

        return data;
    })
  }
}
