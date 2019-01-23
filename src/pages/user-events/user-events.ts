import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-user-events',
  templateUrl: 'user-events.html',
})
export class UserEventsPage {
  pet: string = "kittens";
  apiUrl: string;
  posts: any;
  email: any;
  toasts: any;

  constructor(private nativeStorage: NativeStorage,public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.nativeStorage.getItem('email')
    .then(
      data => {
        console.log("Checking for Email:" + data);
        this.email = data;
        this.fetchtime();
      },
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserEventsPage');
  }

  fetchtime() {
    let loader = this.loadingCtrl.create({
      content: "Loading Data..."
    });
    loader.present();

    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/getevents.php?user_email=' + this.email;

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
        //this.posts = Array.of(this.posts);

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

 

}
