import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { UsersettingsPage } from '../usersettings/usersettings';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoginUserPage } from '../login-user/login-user';
//import { FCM } from '@ionic-native/fcm';
import { MosquePage } from '../mosque/mosque';
import { NotificationPage } from '../notification/notification';
import { UserEventsPage } from '../user-events/user-events';
import { AdminMsgPage } from '../admin-msg/admin-msg';
import { JanazaPage } from '../janaza/janaza';
import { FormPage } from '../form/form';
import { BusinessPage } from '../business/business';


@Component({
  selector: 'page-home1',
  templateUrl: 'home1.html',
})
export class Home1Page {
  
  profile_picture: any;
  name: any;
  email: any;
  event: { month: string; timeStarts: string; timeEnds: string; };
 
  event1: { month: string; timeStarts: string; timeEnds: string; };
  event2: { month: string; timeStarts: string; timeEnds: string; };
  event3: { month: string; timeStarts: string; timeEnds: string; };
  event4: { month: string; timeStarts: string; timeEnds: string; };
  topics: any;
  check: any;
  checkAll:boolean = false;

  selected = "";
  user = {
    name: 'Racing Room',
    twitter: '@admin',
    profileImage: '../assets/img/avatar/cosima-avatar.jpg',
    followers: 456,
    following: 1052,
    tweets: 35
  };
  posts: { 'image': string; 'name': string; 'id': string; }[];
  pay_status: string;

  constructor(public alertCtrl : AlertController ,private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams) {  
   
    this.posts = [
      { 'image': 'imgs/mosque_outline4.png', 'name': 'My Mosque', 'id': '1' },
      { 'image': 'imgs/events_outline.png', 'name': 'Events', 'id': '2' },
      { 'image': 'imgs/janaza_outline.png', 'name': 'Janazah', 'id': '3' },
      { 'image': 'imgs/msg_outline.png', 'name': 'My Messages', 'id': '4' },
      { 'image': 'imgs/business.png', 'name': 'Halal Business', 'id': '5' },
      { 'image': 'imgs/settings3.png', 'name': 'Settings', 'id': '6' },
    ]

    this.nativeStorage.getItem('email')
    .then(
      data => {
        console.log("Checking for Email:" + data);
        this.email = data;
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('name')
    .then(
      data => {
        console.log("Checking for Email:" + data);
        this.name = data;
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('profile_picture')
    .then(
      data => {
        console.log("Checking for profile pic home1page:" + data);
        this.profile_picture = data;
      },
      error => console.error(error)
    );
   }

out()
{
  this.navCtrl.setRoot(LoginUserPage);
  //this.navCtrl.push(LoginUserPage);
}

janaza()
{
  this.navCtrl.push(JanazaPage);
}

openmosque()
{
  this.navCtrl.push(MosquePage);
}

notification()
{
 this.navCtrl.push(NotificationPage);
}

settings()
{
  this.navCtrl.push(UsersettingsPage);
}

events()
{
  this.navCtrl.push(UserEventsPage);
}

msg()
{
  this.navCtrl.push(AdminMsgPage);
}

form()
{
  this.navCtrl.push(FormPage);
}

addEvent(index: string, id: string) {
  this.selected = index;
  console.log("Id:" + id);


  if (id === '1') {
    this.navCtrl.push(MosquePage);
  }
  else if (id === '2') {
    this.navCtrl.push(UserEventsPage);
  }
  else if (id === '3') {
    this.navCtrl.push(JanazaPage);
  }
  else if (id === '4') {
    this.navCtrl.push(AdminMsgPage);
  }
  else if (id === '5') {
    this.navCtrl.push(BusinessPage);
  }
  else if (id === '6') {
    this.navCtrl.push(UsersettingsPage);
  }

}



}
