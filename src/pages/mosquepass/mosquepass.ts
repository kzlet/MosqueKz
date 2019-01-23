import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-mosquepass',
  templateUrl: 'mosquepass.html',
})
export class MosquepassPage {
  password: any;
  con_password: any;
  apiUrl: string;
  posts: any;
  email: any;

  constructor(private nativeStorage: NativeStorage, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
    this.nativeStorage.getItem('m_email')
    .then(
      data => {
        console.log("Checking for m_name:" + data);
        this.email = data;
      },
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MosquepassPage');
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

    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/changemosquepass.php?email=' + this.email + '&password=' + this.password;

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
