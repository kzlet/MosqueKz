import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { MosqueloginPage } from '../mosquelogin/mosquelogin';


@Component({
  selector: 'page-prayers',
  templateUrl: 'prayers.html',
})
export class PrayersPage {
  jummah: string;
  isha: string;
  maghrib: string;
  asr: string;
  zohar: string;
  fajr: string;
  email: any;
  m_name: any;
  apiUrl: string;
  posts: any;
  constructor(public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, private transfer: FileTransfer, private camera: Camera, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
    this.nativeStorage.getItem('m_email')
      .then(
        data => {
          console.log("Checking for Email:" + data);
          this.email = data;
          this.fetchtime();
        },
        error => console.error(error)
      );
    this.nativeStorage.getItem('m_name')
      .then(
        data => {
          console.log("Checking for Mosque name:" + data);
          this.m_name = data;
        },
        error => console.error(error)
      );
  }

  // ionViewWillEnter(){
  //   console.log("Will Enter view called");
  //   this.fetchtime();
  // }


  fetchtime() {
    let loader = this.loadingCtrl.create({
      content: "Loading Data..."
    });
    loader.present();

    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/getnamaztimings.php?masjid_email=' + this.email;

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;

        this.jummah = this.posts.jummah;
        this.isha = this.posts.isha;
        this.maghrib = this.posts.maghrib;
        this.asr = this.posts.asr;
        this.zohar = this.posts.zohar;
        this.fajr = this.posts.fajr;

        if (this.posts === undefined || this.posts === 'undefined') {
          alert("No Timings set yet");
          loader.dismiss();
        }
        else

          // this.posts = Array.of(this.posts);

          loader.dismiss();

      }, error => {
        console.log(error); // Error getting the data

      });
  }

  signup() {
    console.log("Fajar:" + this.fajr);

    let loader = this.loadingCtrl.create({
      content: "Updating Prayer Timings..."
    });
    loader.present();

    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/updateprayertime.php?masjid_email=' + this.email + '&fajr=' + this.fajr + '&zohar=' + this.zohar + '&asr=' + this.asr + '&maghrib=' + this.maghrib + '&isha=' + this.isha + '&jummah=' + this.jummah + '&m_name=' + this.m_name;  //change api


    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
        console.log(data);
        var status = data.Status;
        if (status === 'success') {
          let alert = this.alertCtrl.create({
            title: 'Prayer Timings Updated...',
            buttons: ['OK']
          });
          alert.present();
          loader.dismiss();
          //this.fetchtime();
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
