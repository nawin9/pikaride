import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { SearchComponent } from '../../components/search/search';
import { GeoProvider } from '../../providers/geo/geo';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-journey',
  templateUrl: 'journey.html'
})
export class JourneyPage {

  address: any = {
    place: '',
    set: false,
  };
  map: any;
  markers: any[] = [];
  subscription: any;
  icon: any = {
    url: 'assets/img/car.png',
    scaledSize: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
  };
  @ViewChild('map') mapElement: ElementRef;

  constructor(
    private geo: GeoProvider,
    public geolocation: Geolocation,
    public navCtrl: NavController,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    this.initMap();
    this.subscription = this.geo.hits
      .subscribe(hits => {
        this.clearMarker();
        hits.map(m => {
          this.addMarkerCar({lat: m.location[0], lng: m.location[1]});
        })
      });
  }

  ionViewDidLeave() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showModal() {
    const modal = this.modalCtrl.create(SearchComponent);
    modal.onDidDismiss(data => {
      if (data) {
        this.address.set = true;
        this.address.place = data.description;
        this.geo.geoCode(data.description)
          .then(({lat, lng}) => {
            this.geo.getLocations(5, [lat, lng]);
            this.addMarker({lat: lat, lng: lng});
            this.map.setCenter(new google.maps.LatLng(lat, lng));
          });
      }
    })
    modal.present();
  }

  private initMap() {
    this.geolocation.getCurrentPosition()
      .then(pos => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const latLng = new google.maps.LatLng(lat, lng);
        const mapOptions = {
          center: latLng,
          zoom: 12,
          mapTypeControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.addMarker({lat: lat, lng: lng});
      })
      .catch(err => console.log(err))
  }

  private addMarkerCar(position) {
    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position,
      icon: this.icon
    });
    this.markers.push(marker);
  }

  private clearMarker() {
    if (this.markers) {
      this.markers.map(m => m.setMap(null));
      this.markers.length = 0;
    }
  }

  private addMarker(position) {
    new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });
  }

  showList() {
    this.navCtrl.push('DriverPage');
  }
}
