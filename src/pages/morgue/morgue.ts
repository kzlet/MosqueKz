import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { MosqueloginPage } from '../mosquelogin/mosquelogin';

@Component({
  selector: 'page-morgue',
  templateUrl: 'morgue.html',
})
export class MorguePage {
  person: any;
  description: any;
  date: any;
  time: any;
  location: any;
  apiUrl: string;
  email: any;

  constructor(public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
    this.nativeStorage.getItem('m_email')
    .then(
      data => {
        console.log("Checking for Email:" + data);
        this.email = data;
      },
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorguePage');
  }

  signup() {
    let loader = this.loadingCtrl.create({
      content: "Uploading Data..."
    });
    loader.present();

    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/updatemorguedata.php?masjid_email=' + this.email + '&person=' + this.person + '&description=' + this.description + '&date=' +this.date + '&time=' + this.time + '&location=' + this.location;  //change api


    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
        console.log(data);
        var status = data.Status;
        if (status === 'success') {
          loader.dismiss();
          const alert = this.alertCtrl.create({
            title: 'Information Posted Successfully!',
            subTitle: 'Once Admin approves it, will be published to Users.',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.setRoot(MosqueloginPage);
        }
        else {
          loader.dismiss();
        }
      }, error => {
        console.log(error);// Error getting the data
      });
  
}

}
