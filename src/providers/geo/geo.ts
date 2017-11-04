import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import Geofire from 'geofire';

import * as fb from 'firebase';
declare var google: any;

@Injectable()
export class GeoProvider {
  gf: Geofire;
  gfl: Geofire;
  hits = new BehaviorSubject([]);

  constructor(
    private db: AngularFireDatabase
  ) {
    const ref = this.db.object('geofires');
    this.gf = new Geofire(ref);
    const refl = fb.database().ref().child('geofires');
    this.gfl = new Geofire(refl);
  }

  setDestination(data) {
    this.gf.set(data.userId, [data.end.lat, data.end.lng])
      .then(_ => {
        const ref = this.db.object('profiles/' + data.userId);
        ref.update({destination: data.address});
        console.log('success save location');
      })
      .catch(err => console.log(err))
  }

  removeDestination(data, success) {
    this.gf.remove(data.userId)
      .then(() => {
        const ref = this.db.object('profiles/' + data.userId + '/destination');
        ref.remove();
        console.log("successfully removed key");
        success();
      })
      .catch(err => console.log(err));
  }

  getDestination(userId) {
    return new Promise((resolve, reject) => {
      this.db.object('geofires/' + userId).valueChanges()
        .subscribe(resolve)
    })
  }

  geoCode(address: any) {
    return new Promise((resolve, reject) => {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': address}, (results, status) => {
        const lat = results[0].geometry.location.lat();
        const lng = results[0].geometry.location.lng();
        resolve({lat: lat, lng: lng});
      });
    })
  }

  getLocations(radius: number, coords: [number]) {
    this.gfl.query({center: coords, radius: radius})
      .on('key_entered', (key, location, distance) => {
        const hit = {
          location: location,
          distance: distance
        };
        const currentHits = this.hits.value;
        currentHits.push(hit);
        this.hits.next(currentHits);
      })
  }
}
