import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-viewbusiness',
  templateUrl: 'viewbusiness.html',
})
export class ViewbusinessPage {
  name: any;
  business_id: any;
  bg_image: any;
  description: any;

  constructor(private view: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.name = this.navParams.get('name');
    this.business_id = this.navParams.get('id');
    this.bg_image = this.navParams.get('bg_image');
    this.description = this.navParams.get('description');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewbusinessPage');
  }

  close() {
    this.view.dismiss();
  }

}
