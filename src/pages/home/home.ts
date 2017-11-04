import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { SearchComponent } from '../../components/search/search';
import { GeoProvider } from '../../providers/geo/geo';

declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  start: any;
  end: any;
  markerDestination: any;
  isSet: boolean = false;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  userId: string = '';

  constructor(
    private geo: GeoProvider,
    private storage: Storage,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,
    public geolocation: Geolocation
  ) {
    this.storage.get('userId').then((val) => {
      console.log('Your uid', val);
      this.userId = val;
    });
  }

  ionViewDidLoad(){
    this.initMap();
  }

  showModalDestination() {
    if (this.end === undefined || this.end === null) {
      const modal = this.modalCtrl.create(SearchComponent);
      modal.onDidDismiss(data => {
        if (data) {
          this.end = data.description;
          this.calculateAndDisplayRoute(this.start, this.end);
          this.isSet = true;
        }
      })
      modal.present();
      return;
    }
    const alert = this.alertCtrl.create({
      title: 'Annuler la destination',
      message: 'Voulez-vous supprimer cette destination?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.geo.removeDestination({
              userId: this.userId,
            }, () => {
              this.directionsDisplay.setMap(this.map);
              this.directionsDisplay.setOptions({suppressMarkers: true});
              this.directionsDisplay.setDirections({routes: []});
            });
          }
        }
      ]
    });
    alert.present();
  }

  async confirmDestination() {
    const end = await this.geo.geoCode(this.end);
    const alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Voulez-vous confirmer cette destination?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.geo.setDestination({
              userId: this.userId,
              end: end,
              address: this.end
            });
          }
        }
      ]
    });
    alert.present();
  }

  private async initMap() {
    try {
      const position = await this.geolocation.getCurrentPosition();
      const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      const mapOptions = {
        center: latLng,
        zoom: 13,
        mapTypeControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      this.start = latLng;
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker({lat: position.coords.latitude, lng: position.coords.longitude});
      this.directionsDisplay.setMap(this.map);

      const a: any = await this.geo.getDestination(this.userId);
      if (a) {
        this.end = new google.maps.LatLng(a.location[0], a.location[1]);
        this.calculateAndDisplayRoute(this.start, this.end);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  calculateAndDisplayRoute(start: any, end: any) {
    this.directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        console.log('Directions request failed due to ' + status);
      }
    });
  }

  private addMarker(position) {
    const marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });
    const content = '<h4>Vous êtes ici!</h4>';
    this.addInfoWindow(marker, content);
  }

  private addInfoWindow(marker, content) {
    const infoWindow = new google.maps.InfoWindow({
      content: content
    });
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
  }
}
