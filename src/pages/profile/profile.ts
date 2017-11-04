import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  user = {
    name: 'Pikachu',
    occupation: 'Informaticien',
    location: 'Paris',
    description: 'Passioné des nouvelles tech',
    address: '95 avenue Parmentier, 75011 Paris',
    phone: '06 12 34 56 79',
    email: 'pikachu@pikaride.fr'
  };

  constructor() {
  }

}
