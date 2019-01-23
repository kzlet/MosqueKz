import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';
import { AboutPage } from '../about/about';
import { TermsPage } from '../terms/terms';
import { PrivacyPage } from '../privacy/privacy';
import { UpdateuserPage } from '../updateuser/updateuser';
import { UserpassPage } from '../userpass/userpass';
import { FormPage } from '../form/form';


@Component({
  selector: 'page-usersettings',
  templateUrl: 'usersettings.html',
})
export class UsersettingsPage {

  constructor(public alertCtrl: AlertController, private nativeStorage: NativeStorage, public app: App,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersettingsPage');
  }
  
   terms()
  {
	  this.navCtrl.push(TermsPage);
  }
  
  privacy()
  {
	  this.navCtrl.push(PrivacyPage);
  }
  
  update_prof()
  {
    this.navCtrl.push(UpdateuserPage);
  }
  
  changePass()
  {
    this.navCtrl.push(UserpassPage);
  }

  form()
  {
   this.navCtrl.push(FormPage);
  }

  logout()
  {
    var user_authentication = 0;

    const confirm = this.alertCtrl.create({
      title: 'Do you want to Logout ?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Agree clicked');
            this.nativeStorage.setItem('user_authentication', user_authentication)
            .then(
              () => console.log('user_authentication In-Active!'),
              error => console.error('Error storing item', error)
            );
         
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });
    confirm.present();

  
  }

  dev()
  {
    this.navCtrl.push(AboutPage);
  }
}
