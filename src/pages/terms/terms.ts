import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {

  constructor(private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
  }

  close()
  {
    this.view.dismiss();
  }
  
}
