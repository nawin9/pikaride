import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { ProfilePageModule } from '../pages/profile/profile.module';
import { JourneyPageModule } from '../pages/journey/journey.module';
import { DriverPageModule } from '../pages/driver/driver.module';
import { LoginPageModule } from '../pages/login/login.module';

import { SearchComponent } from '../components/search/search';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { environment } from '../environments/environment';
import { DatabaseProvider } from '../providers/database/database';
import { GeoProvider } from '../providers/geo/geo';

@NgModule({
  declarations: [
    MyApp,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ProfilePageModule,
    JourneyPageModule,
    DriverPageModule,
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SearchComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AngularFireDatabase,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    GeoProvider
  ]
})
export class AppModule {}
