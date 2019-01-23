import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html',
})
export class PrivacyPage {

  constructor(private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PrivacyPage');
  }

  close()
  {
    this.view.dismiss();
  }

}
