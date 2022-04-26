import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, AlertController, LoadingController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage-angular';
import { async } from '@angular/core/testing/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email_address: string = "";
  password: string = "";
  
  disableButton;

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
    // await this.storage.create();
  }

  ionViewDidEnter(){
    this.disableButton = true;
    
  }

  async tryLogin(){
    if(this.email_address == ""){
      this.presentToast('Email Address is required');
    }else if(this.password == ""){
      this.presentToast('Password is required');

    }else{
      this.disableButton = true;
      const loader = await this.loadingctrl.create({
        message: 'Please wait.......',
      });

      loader.present();

      return new Promise(resolve =>{
        let body = {
          action: 'process_login',
          email: this.email_address,
          password: this.password
        }
        this.accsPvds.postData(body, 'process_api.php').subscribe((res:any)=>{
          if(res.success == true){
            loader.dismiss();
            this.disableButton = false;
            this.presentToast('Login Successfully');
            this.storage.set('storage_xxx', res.result); // create storage session
            this.navctrl.navigateRoot(['/home']);

          }else{
            loader.dismiss();
            this.disableButton = false;
            this.presentToast('Email or Password is incorrect');
          }

          },(err)=>{
            loader.dismiss();
            this.disableButton = false;
            this.presentToast(err.message);
        });
      });
    }
  }

  async presentToast(a){
    const toast = await this.toastctrl.create({
      message: a,
      duration: 1500,
    });
    toast.present();
  }

}
