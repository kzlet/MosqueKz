import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Home1Page } from '../home1/home1';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginUserPage } from '../login-user/login-user';

@Component({
  selector: 'page-userconfirm',
  templateUrl: 'userconfirm.html',
})
export class UserconfirmPage {

  code2: any;
  code1: any;
  con_code: any;
  confirm_code: any;
  email: any;
  apiUrl: string;
constructor(public toastCtrl: ToastController,public alertCtrl: AlertController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,private loadingCtrl: LoadingController,private http: Http) {

  this.confirm_code = this.navParams.get('send');
    this.nativeStorage.getItem('email')
    .then(
      data => {
        console.log("Checking for Email:" + data);
        this.email = data;
      },
      error => console.error(error)
    );

    // this.nativeStorage.getItem('confirm_code')
    // .then(
    //   data => {
    //     console.log("Checking for confirm_code:" + data);
    //     this.confirm_code = data;
    //   },
    //   error => console.error(error)
    // );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserconfirmPage');
  }

  continue()
  {
    console.log("Con code entered:" + this.con_code);
    console.log("Code in your drive" + this.confirm_code);

    this.code1 = +this.con_code;
    this.code2 = +this.confirm_code;

    if(this.code1 === this.code2)
    {
      this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/update_user_status.php?email=' + this.email ;
      console.log(this.apiUrl)
      this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
      }, error => {
        console.log(error); 
      });
      let alert = this.alertCtrl.create({
        title: 'Welcome to Halal House ! Please login to Continue...',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.push(LoginUserPage);
    }
    else if (this.code1 != this.code2)
    {
      let alert = this.alertCtrl.create({
        title: 'Code does not match !',
        buttons: ['OK']
      });
      alert.present();
    }
    else{
      let alert = this.alertCtrl.create({
        title: 'Server Problem ! Please try again later',
        buttons: ['OK']
      });
      alert.present();
    }

  }

  resend(send : string)
  {
    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/user_resend.php?email=' + this.email ;
    console.log(this.apiUrl)
  
     let loader = this.loadingCtrl.create({
       content: "Resending the Code..."
     });
     loader.present();
  
     console.log(this.apiUrl);
  
     this.http.get(this.apiUrl).map(res => res.json())
     .subscribe(data => {
  
       console.log(data);

       if (data.Status === 'success')
       {
        const toast = this.toastCtrl.create({
          message: 'Code Send Successfully',
          duration: 3000
        });
        toast.present();
        this.confirm_code = data.confirm_code;
        this.navCtrl.setRoot(UserconfirmPage,{send : this.confirm_code});
         loader.dismissAll();
       }
     
else{
  const toast = this.toastCtrl.create({
    message: 'Error sending Code, Try Again Later',
    duration: 3000
  });
  toast.present();
   loader.dismissAll();
}
     }, error => {
       console.log(error); 
  
     });
  }
}
