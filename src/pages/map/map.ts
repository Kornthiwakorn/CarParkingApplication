import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';
import { DetailPage } from '../detail/detail';


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map: GoogleMap;
  object: DataSnapshot;
  
  No="ยังไม่ได้ติดตั้งอุปกรณ์"
  Show : any;



  constructor(public navCtrl: NavController, public navParams: NavParams,
    public geolocation: Geolocation,
    public plt: Platform,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController) {







  }

  ionViewDidLoad() {

    this.plt.ready().then(() => {

      this.loadMap();

    });

  }

  loadMap() {

    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: {
          lat: 13.0003028,
          lng: 96.9924234
        },
        zoom: 16,
        tilt: 30
      }
    });

     this.map.clear();

    this.map.getMyLocation().then((location: MyLocation) => {

        this.map.animateCamera({
          target: location.latLng,
          zoom: 16,
          tilt: 30
        }).then(() => {
             let marker: Marker = this.map.addMarkerSync({
              title: 'My current Location',
              snippet: 'ฉันอยู่ตรงนี้',
              position: location.latLng,
             
            });


            this.db.database.ref('/ParkingInfo').on('value', res => {
              this.object = res;
              this.object.forEach(parkingInfo => {

                if(parkingInfo.val().empSlot!=this.No){

                    this.Show = "จำนวนช่องว่าง :  " + parkingInfo.val().empSlot+ "  ช่อง"
                }else{

                  this.Show = "ไม่ได้ติดตั้งอุปกรณ์"

                }
                
               
                let marker: Marker = this.map.addMarkerSync({
                  title: "ชื่อลานจอดรถ  : " + parkingInfo.val().name,
                  snippet: this.Show ,
                  icon: 'blue',
                  position: {
                    lat: parseFloat(parkingInfo.val().lat),
                    lng: parseFloat(parkingInfo.val().lng)
                  },

                 
                  map: this.map

                });

                marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(() => {
                  this.navCtrl.push(DetailPage, { parkingInfo: parkingInfo.key });
                });

              });
            
            });

            this.map.addCircleSync({
              'center': location.latLng,
              'radius': 1000,
              'strokeColor': '#248f24',
              'strokeWidth': 5,
              'fillColor': '#59cc33',


            });


            marker.showInfoWindow();


            
            

          });
      });


  }







}


