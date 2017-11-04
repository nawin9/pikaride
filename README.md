## PikaRide

This a tiny project made for Epitech module 'Mobile Hybrid Application'.

### Description

This app allows users to find a car which can drives them to a desired destination.

+ A user who owns a car creates a destination by giving its address.
+ A passenger needs a ride and search for drivers whose destination are closed to his/hers.


### Installation

#### Browser live reloading

Note that on Safari, google map cannot be loaded. So better use chrome for testing. :-(
```bash
$ sudo npm install -g ionic cordova
$ git clone https://github.com/nawin9/pikaride
$ cd pikaride && ionic serve -l
```

#### Running on devices

```bash
$ ionic cordova platform add ios
$ ionic cordova run ios
```
Substitute ios for android for Android device.

#### Ionic view

TODO

### Functionalities

- [x] Firebase database for fetching and saving data
- [x] Firebase authentication
- [x] Firebase geolocation => Rapidly search for nearby locations
- [ ] Fetch & update user profile
- [x] Display nearby drivers on map as car pin
- [ ] List nearby drivers
- [ ] Check user profile from a car pin
- [ ] Overall design
- [ ] Testing on bad conditions (low internet speed)
