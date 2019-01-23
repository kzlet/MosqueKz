import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-usermosque',
  templateUrl: 'usermosque.html',
})
export class UsermosquePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsermosquePage');
  }

}
