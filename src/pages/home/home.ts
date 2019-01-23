import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MosqueSignupPage } from '../mosque-signup/mosque-signup';
import { LoginUserPage } from '../login-user/login-user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  segment()
  {
this.navCtrl.push(MosqueSignupPage);

  }
  user()
  {
this.navCtrl.push(LoginUserPage);

  }
}
