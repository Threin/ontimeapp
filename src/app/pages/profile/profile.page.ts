import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  back: boolean;
  name: string;
  contact: any;
  email: any;
  address: any;
  datastorage: any;
  id: any;

  constructor(public router: Router, private storage: Storage ) { }

  ngOnInit() {
    const data = this.router.url.split('/');
    console.log(data);
    if(data[1] == 'home'){
      this.back = true;
    } else {
      this.back = false;
    }

  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage = res;
      this.name = this.datastorage.rider_name;
      this.contact = this.datastorage.rider_contactNumber;
      this.email = this.datastorage.rider_email;
      this.address = this.datastorage.rider_address;
      this.id = this.datastorage.id;
    });
  }

}
