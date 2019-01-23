import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginUserPage } from '../login-user/login-user';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-changepassworduser',
  templateUrl: 'changepassworduser.html',
})
export class ChangepassworduserPage {
  email: any;
  apiUrl: string;
  con_code: string;
  posts: any;
  view : any = '0';
  password: string;
  con_password: string;

  constructor(private nativeStorage: NativeStorage, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.email = this.navParams.get('email');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangepassworduserPage');
  }

  check() {
    let loader = this.loadingCtrl.create({
      content: "Sending Data..."
    });
    loader.present();

    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/checkcodeuser.php?email=' + this.email + '&confirm_code=' + this.con_code;

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
        
        if(this.posts.Status === 'success' || this.posts.Status === "success")
        {
          let alert = this.alertCtrl.create({
            title: 'Code Authenticated',
            buttons: ['OK']
          });
          alert.present();
          loader.dismiss();
          this.view = "1";
        }
        else{
        let alert = this.alertCtrl.create({
          title: 'Authentication Error, Code not Verified',
          buttons: ['OK']
        });
        alert.present();
          loader.dismiss();
      }
      }, error => {
        console.log(error); // Error getting the data

      });
  }


  updatePass()
  {
    if( this.password != this.con_password)
    {
      let alert = this.alertCtrl.create({
        title: 'Password do not match !',
        buttons: ['OK']
      });
      alert.present();
    }
    else
  {
    var user_authentication = '0';
    let loader = this.loadingCtrl.create({
      content: "Validating Resources..."
    });
    loader.present();

    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/changeuserpass.php?email=' + this.email + '&password=' + this.password;

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
        
        if(this.posts.Status === 'success' || this.posts.Status === "success")
        {
          let alert = this.alertCtrl.create({
            title: 'Password Updated ! Login again to Continue...',
            buttons: ['OK']
          });
          alert.present();
          loader.dismiss();
          
          this.nativeStorage.setItem('user_authentication', user_authentication)
          .then(
            () => console.log('user_authentication In-Active!'),
            error => console.error('Error storing item', error)
          );
          this.navCtrl.setRoot(LoginUserPage);
        }
        else{

        let alert = this.alertCtrl.create({
          title: 'Authentication Error, Code not Verified',
          buttons: ['OK']
        });
        alert.present();
          loader.dismiss();
      }
      
      }, error => {
        console.log(error); // Error getting the data

      });
    }
  }

}
