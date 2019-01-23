import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ViewbusinessPage } from '../viewbusiness/viewbusiness';
import { FormPage } from '../form/form';

@Component({
  selector: 'page-business',
  templateUrl: 'business.html',
})
export class BusinessPage {
  posts: { "bg_image": string; "name": string; "category": string; "id": string; "location": string; "description": string; }[];

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  
    this.posts = [
      {"bg_image":"imgs/mosque_user.jpg","name":"Halal Corner","category":"food","id":"1","location":"Pompton Street","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"},
      {"bg_image":"imgs/mosque_user.jpg","name":"Mustafa Grills","category":"food","id":"1","location":"Pompton Street","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"},
      {"bg_image":"imgs/mosque_user.jpg","name":"London Central","category":"food","id":"1","location":"Pompton Street","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"},
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BusinessPage');
  }

  open_details(id : string, name: string, description : string, bg_image : string)
  {
    const modal = this.modalCtrl.create(ViewbusinessPage , {id , name , description , bg_image});
    modal.present();
  }

  form()
  {
    this.navCtrl.push(FormPage);
  }

}
