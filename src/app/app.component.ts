import { Component, ViewChild } from '@angular/core';
import { Platform, Events, AlertController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
//import { FCM } from '@ionic-native/fcm';
import { SignupPage } from '../pages/signup/signup';
import { LoginUserPage } from '../pages/login-user/login-user';
import { MosqueloginPage } from '../pages/mosquelogin/mosquelogin';
import { UserconfirmPage } from '../pages/userconfirm/userconfirm';
import { MosqueconfirmPage } from '../pages/mosqueconfirm/mosqueconfirm';
import { Home1Page } from '../pages/home1/home1';
import { MosqueSignupPage } from '../pages/mosque-signup/mosque-signup';
import { NativeStorage } from '@ionic-native/native-storage';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { MosqueprofPage } from '../pages/mosqueprof/mosqueprof';
import { UserEventsPage } from '../pages/user-events/user-events';
import { OneSignal } from '@ionic-native/onesignal';
import { AboutPage } from '../pages/about/about';
import { AdminMsgPage } from '../pages/admin-msg/admin-msg';
import { MosquePage } from '../pages/mosque/mosque';
import { UsersettingsPage } from '../pages/usersettings/usersettings';
import { PrayersPage } from '../pages/prayers/prayers';
import { ForgetpasswordPage } from '../pages/forgetpassword/forgetpassword';

// //firebase Gmail Login setup
// import { Firebase } from '@ionic-native/firebase';

// var firebaseConfig = {
//     apiKey: ".....",
//     authDomain: ".....",
//     databaseURL: ".....",
//     projectId: ".....",
//     storageBucket: ".....",
//     messagingSenderId: "....."
//   };

  //firebase ends here
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  user_authentication : any;
  mosque_authentication : any;
  my_id: Promise<{ userId: string; pushToken: string; }>;
  rootPage:any = HomePage;   //HomePage UserconfirmPage
  uuid_code: any;

  constructor(public alertCtrl: AlertController, private oneSignal: OneSignal, public events: Events, private sqlite: SQLite, private nativeStorage: NativeStorage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    //  events.subscribe('user:login', () => {
        //this.reloaddata();
   //   });

   this.oneSignal.startInit('0f358ae2-c7c7-4ebb-9cc8-bc4fe4256f4b','615540045142');
   this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
   this.oneSignal.handleNotificationReceived().subscribe(() => {
    // do something when notification is received
   });
   this.oneSignal.handleNotificationOpened().subscribe(() => {
     // do something when a notification is opened
    // this.nav.push(LatestPage);
   });
   this.oneSignal.endInit();

   this.oneSignal.getIds().then(identity => {
    console.log(identity.userId + 'its USERID');

   // this.uuid_code = identity.userId;

    this.nativeStorage.setItem('uuid', identity.userId)
      .then(
        () => console.log('UUI Stored!'),
        error => console.error('Error storing item', error)
      );
  });
  

      if (platform.is('android')) {
        // This will only print when on iOS
        console.log('I am an Android device!');
        this.getData();
      }

      
      this.nativeStorage.getItem('mosque_authentication')
      .then(
        data => {
          console.log("Checking for mosque_authentication:" + data);
          this.mosque_authentication = data;
          if(this.mosque_authentication === '1' || this.mosque_authentication === 1)
          {
            // let alert = this.alertCtrl.create({
            //   title: 'Login Successful',
            //   subTitle: 'Welcome to Halal House',
            //   buttons: ['OK']
            // });
            // alert.present();
           this.nav.setRoot(MosqueloginPage);
          }
        },
        error => console.error(error)
      );

      this.nativeStorage.getItem('user_authentication')
      .then(
        data => {
          console.log("Checking for user_authentication:" + data);
          this.user_authentication = data;
          if(this.user_authentication === '1' || this.user_authentication === 1)
          {
            // let alert = this.alertCtrl.create({
            //   title: 'Login Successful',
            //   subTitle: 'Welcome to Halal House',
            //   buttons: ['OK']
            // });
            // alert.present();
            this.nav.setRoot(Home1Page);
          }
        },
        error => console.error(error)
      );



    });
  }

  getData()
  {
    this.sqlite.create({
      name: 'halalhouse.db',
      location: 'default'
    }).then((db: SQLiteObject) => {

      //Table for Survay Results
      db.executeSql('CREATE TABLE IF NOT EXISTS my_mosque(rowid INTEGER PRIMARY KEY, uuid INT, mosque_name TEXT, mosque_email TEXT, user_email TEXT)',[])  //user_email TEXT

        .then(res => console.log('Executed SQL Table created'))
        .catch(e => console.log(e+'Table not created'));

    }).catch(e => console.log(e));
  }
}

