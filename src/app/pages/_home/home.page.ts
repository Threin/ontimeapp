import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  datastorage: any;
  name: string;
  id: any;
  tasks: any;
  imgName: any;
  img: any;

  constructor(
    private router: Router,
    private toastctrl: ToastController,
    private alertctrl: AlertController,
    private loadingctrl: LoadingController,
    private navctrl: NavController,
    private accsPvds: AccessProviders,
    private storage: Storage,

  ) { }

  ngOnInit() {
    this.tasks =[
      {
        imgName: 'All'
      },
      {
        img: 'assets/imgs/permits_listing.png',
        imgName: 'Permits'
      },
      {
        img: 'assets/imgs/destination_map.png',
        imgName: 'Destination'
      },
      {
        img: 'assets/imgs/delivery_man.png',
        imgName: 'Delivery'
      },
      {
        img: 'assets/imgs/destination_map.png',
        imgName: 'Destination'
      },
      {
        img: 'assets/imgs/delivery_man.png',
        imgName: 'Delivery'
      },

    ];
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;
      this.name = this.datastorage.rider_name;
      this.id = this.datastorage.id;
    });
  }

  async processLogout(){
    this.storage.clear();
    this.navctrl.navigateRoot(['/intro']);
    const toast = await this.toastctrl.create({
      message: 'Logout Successfully',
      duration: 1500,
    });
    toast.present();
  }

  goToDelivery(){

  }

}
