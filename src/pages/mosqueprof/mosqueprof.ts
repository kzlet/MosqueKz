import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';
import { SQLite,SQLiteObject} from '@ionic-native/sqlite';
import { MosquePage } from '../mosque/mosque';
//import { FCM } from '@ionic-native/fcm';

@Component({
  selector: 'page-mosqueprof',
  templateUrl: 'mosqueprof.html',
})
export class MosqueprofPage {

  website: string;
  email: string;
  code: string;
  telephone: string;
  address: string;
  coasts: any;
  d: string;
  jummah: string;
  isha: string;
  maghrib: string;
  asr: string;
  zohar: string;
  fajr: string;
  posts: any;
  apiUrl: string;
  mosque_email: any;
  mosque_uuid: any;
  mosque_image: any;
  mosque_name: any;
  user_email: any;
 
  constructor(private sqlite: SQLite, private nativeStorage: NativeStorage, public alertCtrl: AlertController, private view: ViewController, private loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public navParams: NavParams) { // private fcm: FCM,
  var today = new Date();
  today.setHours(0, 0, 0, 0);
  console.log("Today" + today);

  this.d = (new Date()).toString().split(' ').splice(1,3).join(' ');
  console.log("Daily" + this.d);

  this.mosque_name = this.navParams.get('mosque_name');
  this.mosque_image = this.navParams.get('mosque_image');
  this.mosque_uuid = this.navParams.get('mosque_uuid');
  this.mosque_email = this.navParams.get('mosque_email');   

  console.log("Name:" +  this.mosque_name);
  console.log("Image:" + this.mosque_image);
  console.log("UUID" + this.mosque_uuid);
  console.log("Email" +  this.mosque_email);

  this.nativeStorage.getItem('email')
  .then(
    data => {
      console.log("Checking for Email:" + data);
      this.user_email = data;
    },
    error => console.error(error)
  );

  this.getData();
  //this.getmosque();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MosqueprofPage');
  }

  getData()
  {
   let loader = this.loadingCtrl.create({
     content: "Loading Data..."
   });
   loader.present();
 
   this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/getnamaztimings.php?masjid_email=' + this.mosque_email;
   
   console.log(this.apiUrl);
 
    this.http.get(this.apiUrl).map(res => res.json())
    .subscribe(data => {
       
     this.posts = data;
     this.posts = Array.of(this.posts);
     this.getmosque();
    
     loader.dismiss();
    
     }, error => {
       console.log(error); // Error getting the data
 
     });
  }

  //http://letslock.com/WebSamples/masjid/mobile/getmosqueinfo.php?email=
  getmosque()
  {
   this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/getmosqueinfo.php?email=' + this.mosque_email;
   
   console.log(this.apiUrl);
 
    this.http.get(this.apiUrl).map(res => res.json())
    .subscribe(data => {
       
     this.coasts = data;
    // this.coasts = Array.of(this.coasts);
  
     }, error => {
       console.log(error); // Error getting the data
 
     });
  }

  stop()
  {
   const confirm = this.alertCtrl.create({
    title: 'Are you sure you want Un-subscribe ?',
    message: 'If you agree you would not be able to recieve notifications from this Mosque !' ,
    buttons: [
      {
        text: 'Disagree',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Agree',
        handler: () => {
          console.log('Agree clicked');
          console.log(this.mosque_uuid); 
            //Adding to HTTP protocol
        let loader = this.loadingCtrl.create({
          content: "Adding to Subscribers..."
        });
        loader.present();
    
        this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/delete_subscriber.php?mosque_email=' + this.mosque_email + '&user_email=' + this.user_email;  //change api
    
    
        this.http.get(this.apiUrl).map(res => res.json())
          .subscribe(data => {
            console.log(data);
            var status = data.Status;
            if (status === 'success') {
              let alert = this.alertCtrl.create({
                title: 'Deleted from Subscribers Succesfully...',
                buttons: ['OK']
              });
              alert.present();   
              
              this.sqlite.create({
                name: 'halalhouse.db',
                location: 'default'
              }).then((db: SQLiteObject) => {
          //    this.fcm.subscribeToTopic('' + uuid); 
              db.executeSql('DELETE FROM my_mosque WHERE mosque_email=? & user_email=?', [this.mosque_email, this.user_email])  // this.user_email
              .then(() => {
                console.log('DELETE FROM my_mosque WHERE mosque_email=? & user_email=?', [this.mosque_email, this.user_email]);
                this.navCtrl.push(MosquePage);
              })
              .catch(e => console.log(e));
              console.log('function done');
            }).catch(e => console.log(e));

              loader.dismiss();
            }
            else {
              loader.dismiss();
            }
          }, error => {
            console.log(error);// Error getting the data
          }); 
        }
      }
    ]
  });
  confirm.present();
  }

}
