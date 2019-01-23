import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-mosque-admin-msg',
  templateUrl: 'mosque-admin-msg.html',
})
export class MosqueAdminMsgPage {
  apiUrl: string;
  posts: any;
  m_email: any;

  constructor(private iab: InAppBrowser, private nativeStorage: NativeStorage, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public navParams: NavParams)
  {
    this.nativeStorage.getItem('m_email')
    .then(
      data => {
        console.log("Checking for Email:" + data);
        this.m_email = data;
        this.fetchtime();
      },
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminMsgPage');
  }

  fetchtime() {
    let loader = this.loadingCtrl.create({
      content: "Loading Data..."
    });
    loader.present();

    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/getmosqueadminmsg.php?mosque_email=' + this.m_email;
    

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
  }

}