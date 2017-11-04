import { Component, NgZone } from '@angular/core';
import { ViewController } from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'search',
  templateUrl: 'search.html'
})
export class SearchComponent {
  autocompleteItems;
  query;

  latitude: number = 0;
  longitude: number = 0;
  geo: any

  service = new google.maps.places.AutocompleteService();

  constructor(
    public viewCtrl: ViewController,
    private zone: NgZone
  ) {
    this.autocompleteItems = [];
    this.query = '';
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
    this.geo = item;
    //this.geoCode(this.geo);//convert Address to lat and long
  }

  updateSearch() {
    if (this.query == '') {
      this.autocompleteItems = [];
      return;
    }
    const self = this;
    this.service.getPlacePredictions({input: this.query,  componentRestrictions: {country: 'FR'}}, function (predictions, status) {
      self.autocompleteItems = [];
      self.zone.run(() => {
        predictions.forEach((prediction) => {
          self.autocompleteItems.push(prediction);
        });
      });
    });
  }

  //convert Address string to lat and long
  //geoCode(address:any) {
    //const geocoder = new google.maps.Geocoder();
    //geocoder.geocode({'address': address}, (results, status) => {
    //this.latitude = results[0].geometry.location.lat();
    //this.longitude = results[0].geometry.location.lng();
    //alert("lat: " + this.latitude + ", long: " + this.longitude);
   //});
 //}

}
