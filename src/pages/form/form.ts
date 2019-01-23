import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {
  email: any;
  name: any;
  apiUrl: string;
  message: string;
  address: string;
  phone_number: string;

  constructor(public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
  }

  signup() {
    let loader = this.loadingCtrl.create({
      content: "Requesting for Service..."
    });
    loader.present();

    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/halal_business_form.php?name=' + this.name + '&email=' + this.email + '&message=' + this.message + '&address=' + this.address + '&phone_number=' + this.phone_number;  //change api


    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
        console.log(data);
        var status = data.Status;
        if (status === 'success') {
          let alert = this.alertCtrl.create({
            title: 'Data Sent, Our Representative will contact you soon...',
            buttons: ['OK']
          });
          alert.present();
          loader.dismiss();
          //this.fetchtime();
          //    this.navCtrl.setRoot(MosqueloginPage);
          this.name = '';
          this.email = '';
          this.message = '';
          this.address = '';
          this.phone_number = '';

        }
        else {
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Server cannot be connected, Please try again later...',
            buttons: ['OK']
          });
          alert.present();
        }
      }, error => {
        console.log(error);// Error getting the data
      });

  }

}
