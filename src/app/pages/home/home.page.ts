import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  segmentValue = 1;
  datastorage: any;
  id: any;
  bin: string = "";
  taxpayername: string = "";
  tradename: string = "";
  address: string = "";
  permit_status: string = "";
  inTransit: any = [];
  delivered: any = [];
  limit: number = 13;
  start: number = 0;
  datas: any;

  constructor(
    private router: Router,
    private toastctrl: ToastController,
    private alertctrl: AlertController,
    private loadingctrl: LoadingController,
    private accessproviders: AccessProviders,
    private actRoute: ActivatedRoute,
    private storage: Storage,
    private navCtrl: NavController
  ) { }

  segmentedChanged(event){
    console.log(event);
    this.segmentValue = event.detail.value;
  }

  ngOnInit() {
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;
      this.id = this.datastorage.id;
    });

    // this.id = data.id;
      // console.log(this.id);
      // if(this.id !==0){
      //   this.loadPermitByRider();
      // }
      this.start = 0;
      this.inTransit = [];
      this.delivered = [];
      this.loadDeliveredPermit();
      this.loadIntransitPermit();
  }



  ionViewDidEnter(){
    // this.actRoute.params.subscribe((data:any) => {
    //   console.log(data);

    //   this.id = data.id;
    //   console.log(this.id);
    //   if(this.id !==0){
    //     this.loadPermitByRider();
    //   }
    // });
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;
      this.id = this.datastorage.id;
    });

    // this.id = data.id;
      // console.log(this.id);
      // if(this.id !==0){
      //   this.loadPermitByRider();
      // }
      this.start = 0;
      this.inTransit = [];
      this.delivered = [];
      this.loadDeliveredPermit();
      this.loadIntransitPermit();
  }

  async doRefresh(event){
    const loader = await this.loadingctrl.create({
      message: 'Please wait...',
    });
    loader.present();
    this.ionViewDidEnter();
    event.target.complete();

    loader.dismiss();
  }

  // loadData(){
  //   this.start += this.limit;
  //   setTimeout(()=>{
  //     this.loadPermitByRider.().then(()=>{
  //       event.target.complete();
  //     });
  //   }, 500);
  // }

  async loadDeliveredPermit(){
    return new Promise(resolve =>{
      let body = {
        action: 'load_delivered_permits',
        start: this.start,
        limit: this.limit,
        id: this.id
      }

      this.accessproviders.postData(body, 'process_api.php').subscribe((res: any)=>{
        console.log('hi from loadpermit' + JSON.stringify(res));
        for (let datas of res.result){
          this.delivered.push(datas);
        }
        // console.log(this.permits.permit_bin);
        resolve(true);
      });
    });
  }

  async loadIntransitPermit(){
    return new Promise(resolve =>{
      let body = {
        action: 'load_in_transit_permits',
        start: this.start,
        limit: this.limit,
        id: this.id
      }

      this.accessproviders.postData(body, 'process_api.php').subscribe((res: any)=>{
        console.log('hi from loadpermit' + JSON.stringify(res));
        for (let datas of res.result){
          this.inTransit.push(datas);
        }
        // console.log(this.permits.permit_bin);
        resolve(true);
      });
    });
  }

}
