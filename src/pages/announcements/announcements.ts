import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DatePicker } from '@ionic-native/date-picker';
import { MosqueloginPage } from '../mosquelogin/mosquelogin';


@Component({
  selector: 'page-announcements',
  templateUrl: 'announcements.html',
})
export class AnnouncementsPage {

  title: any;
  description: any;
  apiUrl: string;
  email: string;
  url: string;
  imageURI: any;
  event_title: any;
  event_description: any;
  event_date: any;
  m_name: any;
  constructor(public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, private transfer: FileTransfer, private camera: Camera, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
    this.nativeStorage.getItem('m_email')
      .then(
        data => {
          console.log("Checking for Email:" + data);
          this.email = data;
        },
        error => console.error(error)
      );

      this.nativeStorage.getItem('m_name')
      .then(
        data => {
          console.log("Checking for Mosque name:" + data);
          this.m_name = data;
        },
        error => console.error(error)
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnouncementsPage');
  }

  signup() {

    if (this.event_title === undefined || this.event_description === undefined) {
      let alert = this.alertCtrl.create({
        title: 'All fields are required',
        buttons: ['OK']
      });
      alert.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: "Posting Event..."
      });
      loader.present();

      this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/uploadevent.php?event_title=' + this.event_title + '&event_description=' + this.event_description + '&email=' + this.email + '&event_date=' +this.event_date + '&mosque_name=' +this.m_name;  //change api


      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
          console.log(data);
          var status = data.Status;
          if (status === 'success') {
            if (this.imageURI != undefined || this.imageURI != 'undefined') {
              this.uploadImage();
              loader.dismiss();
              this.navCtrl.setRoot(MosqueloginPage);
            }
          }
          else {
            loader.dismiss();
          }
        }, error => {
          console.log(error);// Error getting the data
        });
    }
  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Image Source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
            //this.Alertconfirm();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();

  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      console.log("ImageURL from Source", imagePath)
      this.imageURI = imagePath;
      console.log("ImageURL ", this.imageURI)
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder


  public uploadImage() {

    // File for Upload
    console.log(this.imageURI)
    var targetPath = this.imageURI

    var temp = this.imageURI.replace(".png?", "_");
    var temp1 = temp.replace(".jpg?", "_");
    // File name only
    var filename = temp1;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpeg",
      params: { 'fileName': filename }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    let loadingCtrl = this.loadingCtrl.create({
      content: 'Uploading Image...',
    });
    loadingCtrl.present();

    this.url = "http://stoke-on-trent.org/HalalHouse/mobile/eventimage.php?email=" + this.email + '&event_title=' +this.event_title;   //changed location to public announcments
    //  this.url = "http://www.luxurri.com/luxurri_App/uploadphoto/UploadNIC.php"
    console.log(this.url)
    fileTransfer.upload(this.imageURI, this.url, options).then(data => {
      console.log("FiletransferObject URl", this.imageURI)
      loadingCtrl.dismissAll()
      // this.signup();
      //this.presentToast('Image succesful uploaded.');
      const alert = this.alertCtrl.create({
        title: 'Event Posted Successfully!',
        subTitle: 'Once Admin approves it, will be published to Users.',
        buttons: ['OK']
      });
      alert.present();
      console.log("data", data)
    }, err => {
      loadingCtrl.dismissAll()
      //this.presentToast('Error while uploading file.');
      console.log("Failed uploading image", err);
    });

  }
}
