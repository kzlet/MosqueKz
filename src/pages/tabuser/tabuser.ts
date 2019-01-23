import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Home1Page } from '../home1/home1';
import { NotificationPage } from '../notification/notification';
import { UsermosquePage } from '../usermosque/usermosque';
import { UsersettingsPage } from '../usersettings/usersettings';

@Component({
  selector: 'page-tabuser',
  templateUrl: 'tabuser.html',
})
export class TabuserPage {
tab=Home1Page;
tab1=NotificationPage;
tab2=UsermosquePage;
tab3=UsersettingsPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabuserPage');
  }

}
