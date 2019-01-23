import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@Component({
  selector: 'page-admin-msg',
  templateUrl: 'admin-msg.html',
})
export class AdminMsgPage {
  user_email: any;
  apiUrl: string;
  posts: any;

  constructor(private iab: InAppBrowser, private nativeStorage: NativeStorage,public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public navParams: NavParams)
  {
 this.fetchtime();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminMsgPage');
  }

  fetchtime() {
    let loader = this.loadingCtrl.create({
      content: "Loading Data..."
    });
    loader.present();

    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/getadminmsg.php';
    

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;

        if (this.posts === undefined || this.posts === 'undefined') {
         console.log("No Data yet");
          loader.dismiss();
        }
        else
          loader.dismiss();
      }, error => {
        console.log(error); // Error getting the data

      });
  }

  event(url:string)
  {
    console.log("Event Clicked");
    var text = 'https://';
    const browser = this.iab.create(text + url, '_blank', 'location=no');


   // this.urlapp = 'http:/server10.a2zcreatorz.com/staging/projects/mobapp/uploads/';
   // this.iab.create(this.urlapp + urlText);
  }

}
