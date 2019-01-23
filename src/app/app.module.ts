import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MosqueSignupPage } from '../pages/mosque-signup/mosque-signup';
import { SignupPage } from '../pages/signup/signup';
import { LoginUserPage } from '../pages/login-user/login-user';
import { MosqueloginPage } from '../pages/mosquelogin/mosquelogin';
import { PrayersPage } from '../pages/prayers/prayers';
import { AnnouncementsPage } from '../pages/announcements/announcements';
import { MorguePage } from '../pages/morgue/morgue';
import { MosquesettingsPage } from '../pages/mosquesettings/mosquesettings';

import { HttpModule } from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { DatePicker } from '@ionic-native/date-picker';
import { UsermosquePage } from '../pages/usermosque/usermosque';
import { MosqueconfirmPage } from '../pages/mosqueconfirm/mosqueconfirm';
import { UserconfirmPage } from '../pages/userconfirm/userconfirm';
import { Home1Page } from '../pages/home1/home1';
//import { FCM } from '@ionic-native/fcm';
import { MosquePage } from '../pages/mosque/mosque';
import { MosquemodalPage } from '../pages/mosquemodal/mosquemodal';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { MosqueprofPage } from '../pages/mosqueprof/mosqueprof';
import { NotificationPage } from '../pages/notification/notification';
import { UsersettingsPage } from '../pages/usersettings/usersettings';
import { UserEventsPage } from '../pages/user-events/user-events';
import { AdminMsgPage } from '../pages/admin-msg/admin-msg';
import { TabuserPage } from '../pages/tabuser/tabuser';
import { OneSignal } from '@ionic-native/onesignal';
import { MosquePostingsPage } from '../pages/mosque-postings/mosque-postings';
import { AboutPage } from '../pages/about/about';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { JanazaPage } from '../pages/janaza/janaza';
import { MosqueAdminMsgPage } from '../pages/mosque-admin-msg/mosque-admin-msg';
import { PrivacyPage } from '../pages/privacy/privacy';
import { TermsPage } from '../pages/terms/terms';
import { UpdatemosquePage } from '../pages/updatemosque/updatemosque';
import { UpdateuserPage } from '../pages/updateuser/updateuser';
import { ForgetpasswordPage } from '../pages/forgetpassword/forgetpassword';
import { ForgetpasswordmosquePage } from '../pages/forgetpasswordmosque/forgetpasswordmosque';
import { ChangepasswordmosquePage } from '../pages/changepasswordmosque/changepasswordmosque';
import { ChangepassworduserPage } from '../pages/changepassworduser/changepassworduser';
import { UserpassPage } from '../pages/userpass/userpass';
import { MosquepassPage } from '../pages/mosquepass/mosquepass';
import { FormPage } from '../pages/form/form';
import { BusinessPage } from '../pages/business/business';
import { ViewbusinessPage } from '../pages/viewbusiness/viewbusiness';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MosqueSignupPage,
    SignupPage,
    LoginUserPage,
    MosqueloginPage,
    PrayersPage,
    AnnouncementsPage,
    MorguePage,
    MosquesettingsPage,
    UsermosquePage,
    UserconfirmPage,
    MosqueconfirmPage,
    Home1Page,
    MosquePage,
    MosquemodalPage,
    MosqueprofPage,
    NotificationPage,
    UsersettingsPage,
    UserEventsPage,
    AdminMsgPage,
    TabuserPage,
    MosquePostingsPage,
    AboutPage,
    JanazaPage,
    MosqueAdminMsgPage,
    PrivacyPage,
    TermsPage,
    UpdatemosquePage,
    UpdateuserPage,
    ForgetpasswordPage,
    ForgetpasswordmosquePage,
    ChangepasswordmosquePage,
    ChangepassworduserPage,
    UserpassPage,
    MosquepassPage,
    FormPage,
    BusinessPage,
    ViewbusinessPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    UpdatemosquePage,
    MosqueSignupPage,
    SignupPage,
    LoginUserPage,
    MosqueloginPage,
    PrayersPage,
    AnnouncementsPage,
    MorguePage,
    MosquesettingsPage,
    UsermosquePage,
    MosqueconfirmPage,
    UserconfirmPage,
    Home1Page,
    MosquePage,
    MosquemodalPage,
    MosqueprofPage,
    NotificationPage,
    UsersettingsPage,
    UserEventsPage,
    AdminMsgPage,
    TabuserPage,
    MosquePostingsPage,
    AboutPage,
    JanazaPage,
    MosqueAdminMsgPage,
    PrivacyPage,
    TermsPage,
    UpdateuserPage,
    ForgetpasswordPage,
    ForgetpasswordmosquePage,
    ChangepasswordmosquePage,
    ChangepassworduserPage,
    UserpassPage,
    MosquepassPage,
    FormPage,
    BusinessPage,
    ViewbusinessPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    DatePicker,
    //FCM,
    SQLite,
    OneSignal,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
