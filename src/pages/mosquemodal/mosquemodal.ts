import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import { FCM } from '@ionic-native/fcm';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-mosquemodal',
  templateUrl: 'mosquemodal.html',
})
export class MosquemodalPage {

  posts: any;
  apiUrl: string;
  user_email: any;
  uuid: any;
  constructor(private nativeStorage: NativeStorage, private sqlite: SQLite, public alertCtrl: AlertController, private view: ViewController, private loadingCtrl: LoadingController, private http: Http, public navCtrl: NavController, public navParams: NavParams) { // private fcm: FCM
    this.getData();
    this.nativeStorage.getItem('email')
    .then(
      data => {
        console.log("Checking for Email:" + data);
        this.user_email = data;
      },
      error => console.error(error)
    );
    this.nativeStorage.getItem('uuid')
    .then(
      data => {
        console.log("Checking for uuid:" + data);
        this.uuid = data;
      },
      error => console.error(error)
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MosquemodalPage');
  }

  close() {
    this.view.dismiss();
  }


  getData()
 {
  let loader = this.loadingCtrl.create({
    content: "Loading Mosques..."
  });
  loader.present();

  this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/getallmasjid.php';
   console.log(this.apiUrl);

   this.http.get(this.apiUrl).map(res => res.json())
   .subscribe(data => {
      
    this.posts = data;
    loader.dismiss();
   
    }, error => {
      console.log(error); // Error getting the data

    });
 }

 addto(name : string, email:string)
 {
   //uuid = this.uuid;
   console.log("name:" + name);
   console.log("UUID Code:" + this.uuid);
   console.log("mosque email :" + email);
   console.log("User Email:" + this.user_email);

   const confirm = this.alertCtrl.create({
    title: 'Do you want to recieve notifications from &nbsp;'+ name,
    message: 'By agreeing to this you will be able to recieve all notifications.',
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
          console.log('Add to data');
          this.sqlite.create({
            name: 'halalhouse.db',
            location: 'default'
          }).then((db: SQLiteObject) => {
     
          db.executeSql('INSERT INTO my_mosque VALUES(NULL,?,?,?,?)' , [this.uuid, name, email, this.user_email])  // this.user_email
          .then(res =>() => console.log("Response:" + res))
          .catch(e => console.log(e));
          console.log('error');
        }).catch(e => console.log(e));


        //Adding to HTTP protocol
        let loader = this.loadingCtrl.create({
          content: "Adding to Subscribers..."
        });
        loader.present();
    
        this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/addtosubscriber.php?mosque_email=' + email + '&user_email=' + this.user_email + '&player_id=' + this.uuid;  //change api
    
    
        this.http.get(this.apiUrl).map(res => res.json())
          .subscribe(data => {
            console.log(data);
            var status = data.Status;
            if (status === 'success') {
              let alert = this.alertCtrl.create({
                title: 'Added to Subscribers Succesfully...',
                buttons: ['OK']
              });
              alert.present();     
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
