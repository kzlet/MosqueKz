import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { MosquePostingsPage } from '../mosque-postings/mosque-postings';
import { NativeStorage } from '@ionic-native/native-storage';
import { AboutPage } from '../about/about';

import { TermsPage } from '../terms/terms';
import { PrivacyPage } from '../privacy/privacy';

import { MosqueAdminMsgPage } from '../mosque-admin-msg/mosque-admin-msg';
import { UpdatemosquePage } from '../updatemosque/updatemosque';
import { MosquepassPage } from '../mosquepass/mosquepass';


@Component({
  selector: 'page-mosquesettings',
  templateUrl: 'mosquesettings.html',
})
export class MosquesettingsPage {

  constructor(private nativeStorage: NativeStorage,public app: App, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MosquesettingsPage');
  }


  posts()
  {
    this.navCtrl.push(MosquePostingsPage);
  }

  msg()
  {
    this.navCtrl.push(MosqueAdminMsgPage);
  }

  terms()
  {
	  this.navCtrl.push(TermsPage);
  }
  
  privacy()
  {
	  this.navCtrl.push(PrivacyPage);
  }
  
  profile()
  {
    this.navCtrl.push(UpdatemosquePage);
  }

  location()
  {
    alert("This will allow you to update mosque location");
  }

  password()
  {
    this.navCtrl.push(MosquepassPage);
  }

  logout()
  {
    var mosque_authentication = 0;

    this.nativeStorage.setItem('mosque_authentication', mosque_authentication)
    .then(
      () => console.log('mosque_authentication In-Active!'),
      error => console.error('Error storing item', error)
    );
    this.app.getRootNav().setRoot(HomePage);
  }

  dev()
  {
    this.navCtrl.push(AboutPage);
  }

}
