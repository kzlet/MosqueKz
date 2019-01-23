import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ChangepassworduserPage } from '../changepassworduser/changepassworduser';

@Component({
  selector: 'page-forgetpassword',
  templateUrl: 'forgetpassword.html',
})
export class ForgetpasswordPage {
  apiUrl: string;
  email: string;
  posts: any;

  constructor(public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetpasswordPage');
  }

  sendCode() {
    let loader = this.loadingCtrl.create({
      content: "Sending Data..."
    });
    loader.present();

    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/forgetpassword.php?email=' + this.email;

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
        
        if(this.posts.Status === 'success' || this.posts.Status === 'Success')
        {
          let alert = this.alertCtrl.create({
            title: 'Code Sent, Please check your email',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push(ChangepassworduserPage,{email : this.email});
          loader.dismiss();
        }
        else{
        let alert = this.alertCtrl.create({
          title: 'Network Issue',
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
