import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, ToastController, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { DatePicker } from '@ionic-native/date-picker';
import { UserconfirmPage } from '../userconfirm/userconfirm';
import { Home1Page } from '../home1/home1';
import { MosqueSignupPage } from '../mosque-signup/mosque-signup';
import { ForgetpasswordPage } from '../forgetpassword/forgetpassword';
import { PrivacyPage } from '../privacy/privacy';
import { TermsPage } from '../terms/terms';

@Component({
  selector: 'page-login-user',
  templateUrl: 'login-user.html',
})
export class LoginUserPage {
  uuid: any;
  url: string;
  apiUrl: string;
  check2: any;
  conpassword: any;
  password: any;
  post_code: any;
  dob: any;
  email: any;
  name: any;
  user:string ="login";
  imageURI: any;
  public event = {
    month: '1990-02-19',
  }
  user_code: any;
  city: any;
  code_data: any;

  constructor(public modalCtrl: ModalController, private datePicker: DatePicker, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, private transfer: FileTransfer, private camera: Camera, private nativeStorage: NativeStorage, public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private loadingCtrl: LoadingController, private http: Http) {
    this.nativeStorage.getItem('uuid')
    .then(
      data => {
        //console.log("Checking for UUId:" + data);
        this.uuid = data;
        console.log("UUID before registeration:" + this.uuid);
      },
      error => console.error(error)
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginUserPage');
  }

  forget()
  {
    this.navCtrl.push(ForgetpasswordPage);
  }
  
  next()
  {
    this.navCtrl.push(MosqueSignupPage);
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


  date()
  {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', + date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  signup(send : string) {
    console.log("Image URL:" + this.imageURI);
    if (this.name === undefined ||  this.email === undefined || this.dob === undefined || this.post_code === undefined) {
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
  
    this.apiUrl = 'http://api.postcodes.io/postcodes/'+ this.post_code +'/validate';
  
    console.log(this.apiUrl);
  
    this.http.get(this.apiUrl).map(res => res.json())
      .subscribe(data => {
        this.code_data = data.result;
          loader2.dismiss();
     
          if(this.code_data === 'true' || this.code_data === true )
{

         let loader = this.loadingCtrl.create({
            content: "User Registeration in Progress..."
        });
        loader.present();
  
        this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/usersignup.php?name=' + this.name + '&email=' + this.email +'&post_code=' + this.post_code + '&password='+ this.password + '&dob='+ this.dob + '&uuid=' + this.uuid + '&city=' + this.city;
        
       
        this.http.get(this.apiUrl).map(res => res.json())
          .subscribe(data => {
           loader.dismiss();
  
                console.log(data);

                this.nativeStorage.setItem('email', data.email)
                .then(
                  () => console.log('Email Stored!'),
                  error => console.error('Error storing item', error)
                );

                this.nativeStorage.setItem('confirm_code', data.confirm_code)
                .then(
                  () => console.log('Confirm code Stored!'),
                  error => console.error('Error storing item', error)
                );

                this.nativeStorage.setItem('name', data.name)
                .then(
                  () => console.log('User Name Stored!'),
                  error => console.error('Error storing item', error)
                );
         
                this.nativeStorage.setItem('profile_picture', data.profile_picture)
                .then(
                  () => console.log('User Picture Stored!'),
                  error => console.error('Error storing item', error)
                );

                this.nativeStorage.setItem('city', this.city)
                .then(
                  () => console.log('User City Stored!'),
                  error => console.error('Error storing item', error)
                );

                this.user_code = data.confirm_code;
      
                var status = data.Status;
  
                if (status === 'exist') {
  
                    let alert = this.alertCtrl.create({
                        title: 'User Id already Exists',
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
                  
                  let alert = this.alertCtrl.create({
                    title: 'Registeration Successful',
                    buttons: ['OK']
                  });
                  alert.present();
  
                  if (this.imageURI === undefined || this.imageURI === 'undefined')
                  {
                     console.log("Do nothing");
                     this.navCtrl.setRoot(UserconfirmPage,{send:this.user_code});
                  }
                  else{
         
                this.uploadImage();
              
                loader.dismiss();
  
                    
                  }
                    
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
  
     this.url = "http://stoke-on-trent.org/HalalHouse/mobile/userimage.php?email=" + this.email; 
  //  this.url = "http://www.luxurri.com/luxurri_App/uploadphoto/UploadNIC.php"
    console.log(this.url)
    fileTransfer.upload(this.imageURI, this.url, options).then(data => {
      console.log("FiletransferObject URl",this.imageURI)
    loadingCtrl.dismissAll()
  
    let loader = this.loadingCtrl.create({
      content: "Please Login to Continue..."
  });
  loader.present();
  this.navCtrl.setRoot(UserconfirmPage,{send:this.user_code});
  
    console.log("image uploaded");
    console.log("data",data)
  }, err => {
    loadingCtrl.dismissAll()
    //this.presentToast('Error while uploading file.');
    console.log("Failed uploading image", err);
  });
  
  }
  
  signIn() 
  { 
      
    this.apiUrl = 'http://stoke-on-trent.org/HalalHouse/mobile/userlogin.php?email=' + this.email + '&password=' + this.password;
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

       this.nativeStorage.setItem('email', data.email)
       .then(
         () => console.log('Email Stored!'),
         error => console.error('Error storing item', error)
       );

       this.nativeStorage.setItem('city', data.city)
       .then(
         () => console.log('Email Stored!'),
         error => console.error('Error storing item', error)
       );


       this.nativeStorage.setItem('name', data.name)
       .then(
         () => console.log('User Name Stored!'),
         error => console.error('Error storing item', error)
       );

       this.nativeStorage.setItem('profile_picture', data.profile_picture)
       .then(
         () => console.log('User Picture Stored!'),
         error => console.error('Error storing item', error)
       );

  
       var str = data.Status;
       console.log("Active:" + data.is_active);

       if (str === 'success') {
  if(data.is_active === '1' || data.is_active === 1){

    var mosque_authentication = 0;
    var user_authentication = 1;

    this.nativeStorage.setItem('mosque_authentication', mosque_authentication)
    .then(
      () => console.log('mosque_authentication In-Active!'),
      error => console.error('Error storing item', error)
    );
  
    this.nativeStorage.setItem('user_authentication', user_authentication)
    .then(
      () => console.log('user_authentication Active!'),
      error => console.error('Error storing item', error)
    );
 
    let alert = this.alertCtrl.create({
      title: 'Login Successful',
      subTitle: 'Welcome to Halal House',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.setRoot(Home1Page);
  }
  else if(data.is_active === '0' || data.is_active === 0) 
  {
    let alert = this.alertCtrl.create({
      title: 'Activation Failed',
      subTitle: 'Please verify your account',
      buttons: ['OK']
    });
    alert.present();
    this.navCtrl.setRoot(UserconfirmPage);
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
