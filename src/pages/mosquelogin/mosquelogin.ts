import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnnouncementsPage } from '../announcements/announcements';
import { PrayersPage } from '../prayers/prayers';
import { MorguePage } from '../morgue/morgue';
import { MosquesettingsPage } from '../mosquesettings/mosquesettings';
import { NativeStorage } from '@ionic-native/native-storage';
import { MosquePostingsPage } from '../mosque-postings/mosque-postings';
import { MosqueAdminMsgPage } from '../mosque-admin-msg/mosque-admin-msg';


@Component({
  selector: 'page-mosquelogin',
  templateUrl: 'mosquelogin.html',
})
export class MosqueloginPage {
tab1= AnnouncementsPage;
tab2= PrayersPage;
tab3= MorguePage;
tab4= MosquesettingsPage;
  m_name: any;

  constructor( private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams) {
    this.nativeStorage.getItem('m_name')
    .then(
      data => {
        console.log("Checking for m_name:" + data);
        this.m_name = data;
      },
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MosqueloginPage');
  }

  announcement()
  {
   this.navCtrl.push(AnnouncementsPage);
  }

  prayers()
  {
    this.navCtrl.push(PrayersPage);
  }

  morgue()
  {
    this.navCtrl.push(MorguePage);
  }

  settings_icon()
  {
    this.navCtrl.push(MosquesettingsPage);
  }

  posts()
  {
    this.navCtrl.push(MosquePostingsPage);
  }

  msg()
  {
    this.navCtrl.push(MosqueAdminMsgPage);
  }

}
