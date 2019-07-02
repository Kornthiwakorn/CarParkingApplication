import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DetailPage } from '../detail/detail';

import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs/Observable';
import { MapPage } from '../map/map';




@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {





  parkingInfo: Observable<any[]>;

  loading: any;

No = "ยังไม่ได้ติดตั้งอุปกรณ์"




  constructor(public navCtrl: NavController, public db: AngularFireDatabase, public loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'กำลังโหลด...',
      spinner: 'circles'
    });
    this.loading.present();

    this.parkingInfo = db.list('/ParkingInfo').snapshotChanges();
    
    this.loading.dismiss();

  }

  goDetailCal(parkingList) {
    this.loading = this.loadingCtrl.create({
      content: 'กำลังโหลด...',
      spinner: 'circles',

    });
    this.loading.present();
    this.navCtrl.push(DetailPage, { parkingInfo: parkingList.key });
    this.loading.dismiss();


  }

  goMap() {
    this.loading = this.loadingCtrl.create({
      content: 'กำลังโหลด...',
      spinner: 'circles'
    });
    this.loading.present();
    this.navCtrl.push(MapPage);
    this.loading.dismiss();

   


  }


}
























