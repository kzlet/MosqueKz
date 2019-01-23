import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ActionSheetController, ToastController, AlertController, ModalController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { MosqueloginPage } from '../mosquelogin/mosquelogin';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { MosqueconfirmPage } from '../mosqueconfirm/mosqueconfirm';
import { LoginUserPage } from '../login-user/login-user';
import { TermsPage } from '../terms/terms';
import { PrivacyPage } from '../privacy/privacy';
import { ForgetpasswordPage } from '../forgetpassword/forgetpassword';
import { ForgetpasswordmosquePage } from '../forgetpasswordmosque/forgetpasswordmosque';

@Component({
  selector: 'page-mosque-signup',
  templateUrl: 'mosque-signup.html',
})
export class MosqueSignupPage {
  uuid_code: any;
  url: string;
  imageURI: any;
  apiUrl: string;
  relationship: any;
  website: any;
  user_name: any;
  email: any;
  mobile: any;
  telephone: any;
  code: any;
  address: any;
  conpassword: any;
  password: any;
  check2: any;
  mosque_name: any;
  User:string ="login";
  m_confirm_code: any;
  uuid: any;
  code_data: any;
  constructor(public modalCtrl: ModalController, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, private transfer: FileTransfer, private camera: Camera, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
    this.nativeStorage.getItem('uuid')
    .then(
      data => {
        console.log("Checking for Email:" + data);
        this.uuid = data;
      },
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MosqueSignupPage');
  }

  next()
  {
this.navCtrl.push(LoginUserPage);
  }

  forget()
  {
    this.navCtrl.push(ForgetpasswordmosquePage);
  }
  
tabpage()
{

this.navCtrl.push(MosqueloginPage);

}

openModal2()
{
let profileModal = this.modalCtrl.create(PrivacyPage);
    profileModal.present();
}

openModal1()
{
let profileModal = this.modalCtrl.create(TermsPage);
    profileModal.present();
}


signup(send : string) {
  if (this.mosque_name === undefined ||  this.address === undefined || this.code === undefined || this.mobile === undefined || this.email === undefined || this.user_name === undefined) {
      let alert = this.alertCtrl.create({
          title: 'All fields are required',
          buttons: ['OK']
        });
        alert.present();
  }
  else if (this.password != this.conpassword) {
      let alert = this.alertCtrl.create({
          title: 'Passwords are not same',
          buttons: ['OK']
        });
        alert.present();
  }
  else
  {
    let loader2 = this.loadingCtrl.create({
      content: "Validating Postal Code..."
    });
    loader2.present();
  
    this.apiUrl = 'http://api.postcodes.io/postcodes/'+ this.code +'/validate';
  
    console.log(this.apiUrl);
  
    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
        this.code_data = data.result;
          loader2.dismiss();
     
          if(this.code_data === 'true' || this.code_data === true )
{
    console.log("Before:" + this.uuid_code);
       let loader = this.loadingCtrl.create({
          content: "User Registeration in Progress..."
      });
      loader.present();

      this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/custregister.php?mosque_name=' + this.mosque_name + '&address=' + this.address +'&code=' + this.code + '&telephone='+ this.telephone + '&mobile='+ this.mobile+ '&email='+ this.email+ '&user_name='+ this.user_name + '&website='+ this.website + '&relationship='+ this.relationship + '&password='+ this.password + '&uuid_code=' + this.uuid;
      
     
      this.http.get(this.apiUrl).map(res => res.json())
        .subscribe(data => {
         loader.dismiss();

              console.log(data);

              this.nativeStorage.setItem('m_email', data.email)
              .then(
                () => console.log('Email Stored!'),
                error => console.error('Error storing item', error)
              );

              // this.nativeStorage.setItem('m_confirm_code', data.confirm_code)
              // .then(
              //   () => console.log('Confirm code Stored!'),
              //   error => console.error('Error storing item', error)
              // );
              this.m_confirm_code = data.confirm_code;
    
              var status = data.Status;

              if (status === 'exist') {

                  let alert = this.alertCtrl.create({
                      title: 'Mosque Id already Exists',
                      buttons: ['OK']
                    });
                    alert.present();
              }

              else if(status === 'failed')
              {
                let alert = this.alertCtrl.create({
                  title: 'Registeration Failed ! Server Problem',
                  buttons: ['OK']
                });
                alert.present();
              }
              else {
              loader.present();
              this.uploadImage();
              loader.dismiss();
              }
          }, error => {
              console.log(error);// Error getting the data
          });
        }
        else
        {
          alert("Postal code Verification failed");
        }

        }, error => {
          console.log(error); // Error getting the data
        });
  
  }
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

  let alert = this.alertCtrl.create({
    title: 'Registeration Successful',
    buttons: ['OK']
  });
  alert.present();
  this.navCtrl.setRoot(MosqueconfirmPage, { send: this.m_confirm_code});
  
  console.log("image uploaded");
  console.log("data",data)
}, err => {
  loadingCtrl.dismissAll()
  //this.presentToast('Error while uploading file.');
  console.log("Failed uploading image", err);
});

}

signIn() { 
    
  this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/custlogin.php?email=' + this.email + '&password=' + this.password;
  console.log(this.apiUrl)

   if (this.email === undefined || this.password === undefined) {
     let alert = this.alertCtrl.create({
       title: 'Sign-in Error',
       subTitle: 'Email and Password Required',
       buttons: ['OK']
     });
     alert.present();
     return;
   }
   let loader = this.loadingCtrl.create({
     content: "Signing In..."
   });
   loader.present();

   console.log(this.apiUrl);

   this.http.get(this.apiUrl).map(res => res.json())
   .subscribe(data => {

     console.log(data);
     loader.dismissAll();

     var str = data.Status;

     if (str === 'success') {

if(data.is_active === '2')
{
console.log("Please be patient your profile is under consideration.");
this.navCtrl.push(SignupPage);
}
else if (data.is_active === '1')
{
  var mosque_authentication = 1;
  var user_authentication = 0;

  this.nativeStorage.setItem('m_email', data.email)
  .then(
    () => console.log('Email Stored!'),
    error => console.error('Error storing item', error)
  );

  this.nativeStorage.setItem('m_name', data.mosque_name)
  .then(
    () => console.log('Email Stored!'),
    error => console.error('Error storing item', error)
  );

  this.nativeStorage.setItem('mosque_authentication', mosque_authentication)
  .then(
    () => console.log('mosque_authentication Active!'),
    error => console.error('Error storing item', error)
  );

  this.nativeStorage.setItem('user_authentication', user_authentication)
  .then(
    () => console.log('user_authentication In-Active!'),
    error => console.error('Error storing item', error)
  );

  let alert = this.alertCtrl.create({
    title: 'Login Successful',
    subTitle: 'Welcome to Halal House',
    buttons: ['OK']
  });
  alert.present();
  this.navCtrl.push(MosqueloginPage);
}
else{
  console.log("do nothing");
}

     } else if (str === 'failed') {
       let alert = this.alertCtrl.create({
         title: 'Authentication Failed',
         subTitle: 'Email or Password is Invalid',
         buttons: ['OK']
       });
       alert.present();
     }
   }, error => {
     console.log(error); // Error getting the data

     let alert = this.alertCtrl.create({
       title: 'Network Failed',
       subTitle: 'Please try again later',
       buttons: ['OK']

     });
     alert.present();
     loader.dismissAll();
   });
 }

}
