import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { AccessProviders } from  '../app/providers/access-providers';
import { Storage } from '@ionic/storage-angular';
import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

// import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  datastorage: any;
  name: any;
  id: any;
  contact: any;
  email: any;
  icon: any;
  // pages: any;

  pages: any =[
    {
      title: 'All'
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Profile',
      url: '/profile',
      icon: 'person'
    },
    {
      title: 'About Us',
      url: '/about-us',
      icon: 'information-circle'
    },
    {
      title: 'Privacy Policy',
      url: '/privacy-policy',
      icon: 'document-lock'
    },
    {
      title: 'Sign Out',
      url: '',
      icon: 'log-out', route: true
    },

  ];

  constructor(
    private router: Router,
    private toastctrl: ToastController,
    private alertctrl: AlertController,
    private loadingctrl: LoadingController,
    private navCtrl: NavController,
    private accsPvds: AccessProviders,
    private storage: Storage,
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
  ) {
    this.initializeApp();
  }

  initializeApp(){
    this.storage.create();
    // this.ngOnInit();
    this.platform.ready().then(()=>{
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.storage.get('storage_xxx').then((res)=>{
      if(res==null)
      {
        this.navCtrl.navigateRoot('/login');
        // console.log('hi' + res);

        // console.log('hi' + this.name);
      }else{
        console.log('hi from home' + JSON.stringify(res));
        this.datastorage = res;

        this.name = this.datastorage.rider_name;
        this.id = this.datastorage.id;
        this.email = this.datastorage.rider_email;
        this.contact = this.datastorage.rider_contactNumber;
        this.navCtrl.navigateRoot('/home');
      }
    });
  }

  // ionViewDidEnter(){
  //   this.storage.get('storage_xxx').then((res)=>{
  //     console.log('hello from appcomponent' + res);
  //     this.datastorage = res;
  //     this.name = this.datastorage.rider_name;
  //     this.id = this.datastorage.id;
  //   });
  // }

  async processLogout(){
    this.storage.clear();
    this.navCtrl.navigateRoot(['/login']);
    const toast = await this.toastctrl.create({
      message: 'Logout Successfully',
      duration: 1500,
    });
    toast.present();
  }


}
