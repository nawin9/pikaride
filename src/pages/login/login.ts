import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { DatabaseProvider } from '../../providers/database/database';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(
    private db: DatabaseProvider,
    private storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController) {
  }

  login(user: User) {
    this.db.login(user.email, user.password, (result, id) => {
      if (result) {
        this.storage.set('userEmail', user.email);
        this.storage.set('userId', id);
        this.navCtrl.setRoot('HomePage');
      }
    })
  }

  register() {
    this.navCtrl.push('RegisterPage');
  }
}
