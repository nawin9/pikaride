import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../../models/user';

import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(
    private db: DatabaseProvider,
    public alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  register(user: User) {
    if (user.password !== user.rePassword) {
      let alert = this.alertCtrl.create({
        title: 'Erreur de saisir',
        subTitle: 'Veuillez confirmer le même mot de passe',
        buttons: ['Fermer']
      });
      alert.present();
      return;
    }
    this.db.register(user.email, user.password, () => {
      this.navCtrl.pop();
    });
  }

  login() {
    this.navCtrl.pop();
  }
}
