import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-mosque-postings',
  templateUrl: 'mosque-postings.html',
})
export class MosquePostingsPage {
  pet: string = "kittens";
  email: any;
  apiUrl: string;
  posts: any;
  toasts: any;
  constructor(private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
    this.nativeStorage.getItem('m_email')
    .then(
      data => {
        console.log("Checking for Email:" + data);
        this.email = data;
        this.fetchevents();
        this.fetchmorgue();
      },
      error => console.error(error)
    );
   
    //To display none tabs on any page
    let elements = document.querySelectorAll(".tabbar");
    if (elements != null) {
        Object.keys(elements).map((key) => {
            elements[key].style.display = 'none';
        });
    }
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MosquePostingsPage');
  }


  fetchevents() {
    let loader = this.loadingCtrl.create({
      content: "Loading Data..."
    });
    loader.present();
    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/mosque_events.php?email=' + this.email;
    console.log(this.apiUrl);
    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
        this.posts = data;
        if (this.posts === undefined || this.posts === 'undefined') {
          alert("No Data to Show");
          loader.dismiss();
        }
        else
          // this.posts = Array.of(this.posts);
          loader.dismiss();

      }, error => {
        console.log(error); // Error getting the data

      });
  }

  fetchmorgue() {
    let loader = this.loadingCtrl.create({
      content: "Loading Data..."
    });
    loader.present();

    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/mosque_morgue.php?masjid_email=' + this.email;

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.toasts = data;

        if (this.toasts === undefined || this.toasts === 'undefined') {
          alert("No Data to Show");
          loader.dismiss();
        }
        else

          // this.posts = Array.of(this.posts);

          loader.dismiss();

      }, error => {
        console.log(error); // Error getting the data

      });
  }

}
