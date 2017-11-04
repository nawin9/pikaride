import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ProfilePage } from '../pages/profile/profile';
import { JourneyPage } from '../pages/journey/journey';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';

  pages: Array<{title: string, component: any}>;

  constructor(
    private afAuth: AngularFireAuth,
    private storage: Storage,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen) {
    this.initializeApp();
    this.pages = [
      { title: 'CARTE', component: HomePage },
      { title: 'VOYAGER', component: JourneyPage },
      { title: 'PROFIL', component: ProfilePage },
      { title: 'DECONNEXION', component: null }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.component) {
      this.nav.setRoot(page.component);
    } else {
      this.storage.remove('userId');
      this.storage.remove('userEmail');
      this.afAuth.auth.signOut();
      this.nav.setRoot(LoginPage);
    }
  }
}
