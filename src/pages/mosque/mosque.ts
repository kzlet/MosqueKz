import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { MosquemodalPage } from '../mosquemodal/mosquemodal';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { MosqueprofPage } from '../mosqueprof/mosqueprof';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-mosque',
  templateUrl: 'mosque.html',
})
export class MosquePage {
  email: any;
  bookings: any[];
  posts: any;
  apiUrl: string;
  value1: any;
  value2: boolean;
  value3: any;
  value4: boolean;

  constructor(private nativeStorage: NativeStorage, private sqlite: SQLite, public modalCtrl: ModalController, private loadingCtrl: LoadingController, private http: Http, public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
    this.nativeStorage.getItem('email')
    .then(
      data => {
        console.log("Checking for Email:" + data);
        this.email = data;
        //this.getdata();
        let user_email = this.email;
        this.getOnlineData();
      },
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MosquePage');
  }

 // http://letslock.com/WebSamples/masjid/mobile/getallmasjid.php

 presentProfileModal() {
  let profileModal = this.modalCtrl.create(MosquemodalPage);
  profileModal.onDidDismiss(() => {
    // Call the method to do whatever in your home.ts
       console.log('Modal closed');
      // this.getdata();
      let user_email = this.email;
      this.getOnlineData();
});
  profileModal.present();
}

getdata()
{
  this.sqlite.create({
    name: 'halalhouse.db',
    location: 'default'
  }).then((db: SQLiteObject) => {
  db.executeSql('SELECT * FROM my_mosque WHERE user_email=?', [this.email])
  .then(res => {
    console.log("alert from respnse" + JSON.stringify(res.rows));
    this.bookings = [];
    for (var i = 0; i < res.rows.length; i++) {
      this.bookings.push({ rowid: res.rows.item(i).rowid, uuid: res.rows.item(i).uuid, mosque_name: res.rows.item(i).mosque_name, mosque_image: res.rows.item(i).mosque_image, mosque_email: res.rows.item(i).mosque_email})
      console.log("Response from my_mosque:" + res.rows.item(i).mosque_name);
    }
  })
}).catch(e => console.log(e));
}

sendto(mosque_name: string, mosque_uuid:string, mosque_email:string)
{
  this.navCtrl.push(MosqueprofPage, {mosque_name:mosque_name, mosque_uuid:mosque_uuid, mosque_email:mosque_email});
  console.log("Mosque from mosque page:" + mosque_email);
}


getOnlineData()
{
  let user_email = this.email;
  console.log("User Email:" + user_email);  

  let loader = this.loadingCtrl.create({
    content: "Loading Data..."
  });
  loader.present();

  this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/getsubscribeddata.php?user_email=' + user_email;

  console.log(this.apiUrl);

  this.http.get(this.apiUrl).map(res => res.json())
    .subscribe(data => {

      this.posts = data;

      if (this.posts === undefined || this.posts === 'undefined') {
        alert("No Mosques Subscribed");
        loader.dismiss();
      }
      else
        loader.dismiss();

    }, error => {
      console.log(error); // Error getting the data

    });

}

}
