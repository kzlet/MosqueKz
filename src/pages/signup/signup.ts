import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';


@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  showalert() {
    const alert = this.alertCtrl.create({
  
      subTitle: 'Your request has been forwarded to admin, once approved you will be able to login',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.push(HomePage);
  }

  back()
  {
    this.navCtrl.push(HomePage);
  }
}
