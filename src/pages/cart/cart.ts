import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { Appsetting } from '../../providers/appsetting';
import { Http , RequestOptions , Headers } from '@angular/http';
import { CheckoutBillingAddressPage } from '../../pages/checkout-billing-address/checkout-billing-address';
/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  public item: any;
  public Count : any = '';
  public value = 0;
  public ViewItems = '';
  public countitem = 0;
  public sum = '';

  constructor(public navCtrl: NavController, public http: Http, public menuCtrl: MenuController,public navParams: NavParams,public appsetting: Appsetting)  {
    this.count();
    this.ViewCart();
    
    // this.ViewItems = JSON.parse(localStorage.getItem('ViewCart'));

    // console.log(this.ViewItems);

    // console.log(this.ViewItems.length);

    // this.Count = this.ViewItems.length;
  }
  public openMenu():void {
    this.menuCtrl.open();
  }

  ionViewDidLoad() {

    this.count();
    this.ViewCart();
    
  }
  public increaseValue(event,title,price,image,id,i) {

    console.log(event);
    event++;
    this.value = event;

    var item=[];

    item = JSON.parse(localStorage.getItem('productdata'));

    for (var k in item) {

      console.log(item[i].product_id);

      console.log(item[i]);

      if (item[i].product_id == id) {

        item[i].Qty = this.value;

        console.log(item);

         break; //Stop this loop, we found it!
      }
    }
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

checkout(){
  this.navCtrl.push(CheckoutBillingAddressPage);
}


serializeObj(obj) {
  var result = [];

  for (var property in obj)
    result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

  return result.join("&");
}

  public cartItems = '';

ViewCart(){

  console.log("view");


  var userID = localStorage.getItem('token');

  console.log(userID);

  if(userID==null || userID==undefined || userID==''){

    
    this.cartItems = JSON.parse(localStorage.getItem('productdata'));

    console.log(this.cartItems);

 
  }else{

    var data = {

      user_id : userID
  
    }
  
    let headers = new Headers();
    headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
    let options= new RequestOptions({ headers: headers });
  
    var Serialized = this.serializeObj(data);
    
    this.http.post(this.appsetting.myGlobalVar + this.appsetting.viewCart , Serialized , options).map(result => 
  
      result.json()).subscribe(res => {
  
        console.log(res);
  
        this.cartItems = res.msg;
  
      })

  }

}
cart(){
  console.log('cart');
  this.navCtrl.push(CartPage);
}

public count(){

  var count = JSON.parse(localStorage.getItem('productdata'));

  if(count==null){

    this.countitem = 0;

  }else{
  
    var priceitems = [];


  console.log(count.length);

  this.countitem = count.length;

  for(var i=0;i<count.length;i++){

    var totalprice = count[i].price;

    var qty = count[i].Qty;

    var cal = totalprice*qty;

    var num = Number(cal);

    console.log(num);

    priceitems.push(num);

    console.log(priceitems);

  }


  
  
 
  // function for adding two numbers. Easy!
  const add = (a, b) =>
    a + b
  // use reduce to sum our array
  this.sum = priceitems.reduce(add)

  console.log(this.sum);
}

}


public userid = '';


removeItem(id,i){

  this.userid = localStorage.getItem('token');

  if(this.userid==null ||this.userid==undefined || this.userid==''){

    console.log(i);

    alert("id");

    var item = [];

    item = JSON.parse(localStorage.getItem('productdata'));

    console.log(item);

    item.splice(i, 1);

    console.log(item);

    localStorage.setItem('productdata',JSON.stringify(item));

    console.log(JSON.parse(localStorage.getItem('productdata')));

    this.count();

    this.ViewCart();


  }else {


  var userid = localStorage.getItem('token');

  var data = {

    ID : id,

    user_id : userid

  }

  let headers = new Headers();
  headers.append('Content-Type',  'application/x-www-form-urlencoded;charset=utf-8');
  let options= new RequestOptions({ headers: headers });

  var Serialized = this.serializeObj(data);
  
  this.http.post(this.appsetting.myGlobalVar + this.appsetting.removeCartItem , Serialized , options).map(result => 

    result.json()).subscribe(res => {

      console.log(res);

      this.cartItems = res.msg;

    })

  }
}
update(items){

  console.log(items);

}
}
