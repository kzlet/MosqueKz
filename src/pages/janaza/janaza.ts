import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-janaza',
  templateUrl: 'janaza.html',
})
export class JanazaPage {
  email: any;
  apiUrl: string;
  toasts: any;

  constructor(private nativeStorage: NativeStorage,public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.nativeStorage.getItem('email')
    .then(
      data => {
        console.log("Checking for Email:" + data);
        this.email = data;
        this.fetchmorgue();
      },
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JanazaPage');
  }

  fetchmorgue() {
    let loader = this.loadingCtrl.create({
      content: "Loading Data..."
    });
    loader.present();

    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/getmorgueinfo.php?user_email=' + this.email;

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.toasts = data;

        if (this.toasts === undefined || this.toasts === 'undefined') {
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
