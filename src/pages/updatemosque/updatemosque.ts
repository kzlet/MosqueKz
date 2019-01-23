import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ActionSheetController, ToastController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';



@Component({
  selector: 'page-updatemosque',
  templateUrl: 'updatemosque.html',
})
export class UpdatemosquePage {
  email: any;
  apiUrl: string;
  posts: any;
  imageURI: any;
  address: any;
  user_name: any;
  mobile: any;
  url: string;

  constructor(public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, private transfer: FileTransfer, private camera: Camera, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {

    this.nativeStorage.getItem('m_email')
    .then(
      data => {
        console.log("Checking for m_name:" + data);
        this.email = data;
        this.getData();
      },
      error => console.error(error)
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatemosquePage');
  }

  getData()
  {
    let loader = this.loadingCtrl.create({
      content: "Loading Data..."
    });
    loader.present();

    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/getMosqueProfData.php?email=' + this.email;

    console.log(this.apiUrl);

    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {

        this.posts = data;
        this.imageURI = this.posts.mosque_image;
        this.address = this.posts.address;
        this.mobile = this.posts.mobile;
        this.user_name = this.posts.user_name;

        

        if (this.posts === undefined || this.posts === 'undefined') {
          alert("No Timings set yet");
          loader.dismiss();
        }
        else

          // this.posts = Array.of(this.posts);

          loader.dismiss();

      }, error => {
        console.log(error); // Error getting the data

      });
  }

  signup()
  {
    let loader = this.loadingCtrl.create({
      content: "Updating Profile..."
    });
    loader.present();

    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/updatemoqueprofile.php?email=' + this.email + '&user_name=' + this.user_name + '&address=' + this.address + '&mobile=' + this.mobile;

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
    content: 'Uploading...',
  });
  loadingCtrl.present();
  
     this.url = "http://stoke-on-trent.org/HalalHouse/mobile/image.php?email=" + this.email; 
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
