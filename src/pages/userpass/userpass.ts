import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-userpass',
  templateUrl: 'userpass.html',
})
export class UserpassPage {
  email: any;
  password: any;
  con_password: any;
  apiUrl: string;
  posts: any;

  constructor(private nativeStorage: NativeStorage, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.nativeStorage.getItem('email')
    .then(
      data => {
        console.log("Checking for Email:" + data);
        this.email = data;
      },
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserpassPage');
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
            title: 'Password Updated !',
            buttons: ['OK']
          });
          alert.present();
          loader.dismiss();
          
        }
        else{

        let alert = this.alertCtrl.create({
          title: 'Network Problem',
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
