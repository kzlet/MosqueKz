import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';

@Component({
  selector: 'page-updateuser',
  templateUrl: 'updateuser.html',
})
export class UpdateuserPage {
  email: any;
  name: any;
  imageURI: any;
  city: any;
  apiUrl: string;
  posts: any;
  url: string;

  constructor(public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, private transfer: FileTransfer, private camera: Camera, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
    // http service that calls all the topics
    this.nativeStorage.getItem('email')
    .then(
      data => {
        console.log("Checking for Email:" + data);
        this.email = data;
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('name')
    .then(
      data => {
        console.log("Checking for name:" + data);
        this.name = data;
      },
      error => console.error(error)
    );

    this.nativeStorage.getItem('profile_picture')
    .then(
      data => {
        console.log("Checking for profile :" + data);
        this.imageURI = data;
      },
      error => console.error(error)
    ); 

    this.nativeStorage.getItem('city')
    .then(
      data => {
        console.log("Checking for City:" + data);
        this.city = data;
      },
      error => console.error(error)
    ); 

    
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateuserPage');
  }

  
  UpdateProfile() {
    let loader = this.loadingCtrl.create({
      content: "Updating Profile..."
    });
    loader.present();

    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/updateuserprofile.php?email=' + this.email + '&name=' + this.name + '&city=' + this.city;

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
        
        if(this.posts.Status === 'success' || this.posts.Status === "success")
        {
          this.uploadImage();
          let alert = this.alertCtrl.create({
            title: 'Profile Updates Successfully',
            buttons: ['OK']
          });
          alert.present();

          this.nativeStorage.setItem('city', this.city)
          .then(
            () => console.log('Email Stored!'),
            error => console.error('Error storing item', error)
          );
   
          this.nativeStorage.setItem('name', this.name)
          .then(
            () => console.log('User Name Stored!'),
            error => console.error('Error storing item', error)
          );
   
          this.nativeStorage.setItem('profile_picture', this.imageURI)
          .then(
            () => console.log('User Picture Stored!'),
            error => console.error('Error storing item', error)
          );

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

  //Upload image:
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
     console.log("ImageURL from Source",imagePath)
      this.imageURI = imagePath;
      console.log("ImageURL ",this.imageURI)
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
    
    var temp= this.imageURI.replace(".png?","_");
    var temp1=temp.replace(".jpg?","_");
    // File name only
    var filename = temp1;
    
    var options = {
      fileKey: "file",
      fileName:filename,
      chunkedMode: false,
      mimeType: "image/jpeg",
      params: { 'fileName': filename }
    };
    
    const fileTransfer: FileTransferObject = this.transfer.create();
    
    let loadingCtrl = this.loadingCtrl.create({
      content: 'Updating Resources...',
    });
    loadingCtrl.present();
    
       this.url = "http://stoke-on-trent.org/HalalHouse/mobile/userimage.php?email=" + this.email; 
    //  this.url = "http://www.luxurri.com/luxurri_App/uploadphoto/UploadNIC.php"
      console.log(this.url)
      fileTransfer.upload(this.imageURI, this.url, options).then(data => {
        console.log("FiletransferObject URl",this.imageURI)
      loadingCtrl.dismissAll()
     // this.signup();
      //this.presentToast('Image succesful uploaded.');
      console.log("image uploaded");
      console.log("data",data)
    }, err => {
      loadingCtrl.dismissAll()
      //this.presentToast('Error while uploading file.');
      console.log("Failed uploading image", err);
    });
    
    }

}
