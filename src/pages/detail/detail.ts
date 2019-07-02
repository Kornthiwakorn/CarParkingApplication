import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { DataSnapshot } from '@angular/fire/database/interfaces';



@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  parkingInfoKey: any;
  parkingInfo: DataSnapshot;
  

  btnStart : boolean;
  btnStop : boolean;
  btnClear : boolean;
  
  
  stopTime : any;
  startTime : any;
  diffTime : any;
  parkingFee : number;
  day : any;
  hrs_d  : any; 
  hrs  : any;
  mnts : any;
  secs :any;

  
  loading: any;
  
  No = "ยังไม่ได้ติดตั้งอุปกรณ์"
  
  
 


  constructor(public navCtrl: NavController, public navParams: NavParams, public db : AngularFireDatabase,  public loadingCtrl: LoadingController) {
    
    this.parkingInfoKey = this.navParams.get("parkingInfo");
    let key = '/ParkingInfo/' + this.parkingInfoKey;
    this.db.database.ref(key).on('value', res => {
      this.parkingInfo = res;
      console.log("Detail: " + JSON.stringify(this.parkingInfo));
    });


   
    
    
    
     


    this.btnStart = true;
    this.btnStop = false;
    this.btnClear = false;
  }

  startEvent(){
    
    this.loading = this.loadingCtrl.create({
      content: 'กำลังโหลด...',
      spinner: 'circles'
    });
    this.loading.present();
    
    this.startTime = new Date().getTime();
    this.btnStart = false;
    this.btnStop= true;
    this.btnClear = false;
    this.loading.dismiss();
  }
 
  stopEvent(one : number, next : number){

    
    this.loading = this.loadingCtrl.create({
      content: 'กำลังโหลด...',
      spinner: 'circles'
    });
    this.loading.present();
  

    this.btnStart = false;
    this.btnStop = false;
    this.btnClear = true;
   
     
    this.stopTime = new Date().getTime();
    this.diffTime = (this.stopTime-this.startTime)/1000;

    this.day = Math.floor(this.diffTime / (3600*24));
    this.hrs_d   = Math.floor((this.diffTime- (this.day * (3600*24))) / 3600);
    this.hrs   = Math.floor(this.diffTime / 3600);
    this.mnts = Math.floor((this.diffTime - (this.hrs * 3600)) / 60);
    this.secs = Math.ceil(this.diffTime - (this.hrs * 3600) - (this.mnts * 60));
    
    this.parkingFee = one+(next*this.mnts);
    this.loading.dismiss();
    console.log(next)
  }

  clearEvent(){

    this.loading = this.loadingCtrl.create({
      content: 'กำลังโหลด...',
      spinner: 'circles'
    });
    this.loading.present();
  

    
    this.startTime = null;
    this.stopTime = null;
    this.parkingFee = null;
    this.hrs   = null;
    this.mnts = null;
    this.secs = null;
    
    this.btnStart = true;
    this.btnStop = false;
    this.btnClear = false;
    
    this.loading.dismiss();


  }

  

 
  

  
  ionViewDidLoad() {
    


    
  }

 
}
