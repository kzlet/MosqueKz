import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { MosqueloginPage } from '../mosquelogin/mosquelogin';
import { SignupPage } from '../signup/signup';
import { MosqueSignupPage } from '../mosque-signup/mosque-signup';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-mosqueconfirm',
  templateUrl: 'mosqueconfirm.html',
})
export class MosqueconfirmPage {

  code2: any;
  code1: any;
  con_code: any;
  m_confirm_code: any;
  m_email: any;
  apiUrl: string;
  constructor(public toastCtrl: ToastController, public alertCtrl: AlertController, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController,private http: Http) {

    this.m_confirm_code = this.navParams.get('send');
    this.nativeStorage.getItem('m_email')
    .then(
      data => {
        console.log("Checking for Email:" + data);
        this.m_email = data;
      },
      error => console.error(error)
    );

    // this.nativeStorage.getItem('m_confirm_code')
    // .then(
    //   data => {
    //     console.log("Checking for confirm_code:" + data);
    //     this.m_confirm_code = data;
    //   },
    //   error => console.error(error)
    // );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserconfirmPage');
  }

  continue()
  {
    console.log("Con code entered:" +  this.con_code);
    console.log("Code in your drive" + this.m_confirm_code);

    this.code1 = +this.con_code;
    this.code2 = +this.m_confirm_code;

    if(this.code1 === this.code2)
    {
      console.log("Here");
      let alert = this.alertCtrl.create({
        title: 'Code Confirmed, Login in to continue',
        buttons: ['OK']
      });
      alert.present();
      this.navCtrl.push(MosqueSignupPage);
    }

    else if (this.code1 != this.code2){
      console.log("Not Equal");
      console.log("Code from statement drive" + this.m_confirm_code);
    }

  }

  resend(send : string)
  {
    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/mosque_resend.php?email=' + this.m_email ;
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
        this.m_confirm_code = data.confirm_code;
        this.navCtrl.setRoot(MosqueconfirmPage,{send : this.m_confirm_code});
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
