import{ Injectable } from '@angular/core';
import{ HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Router } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';


@Injectable()

export class AccessProviders {
    //url backend api 'json'

    server: string = 'http://localhost/bplo/api/';

    constructor(
        public http: HttpClient
    ){}

   postData(body,file){
       let headers = new HttpHeaders({
           'Content-Type':'application/json; charset=UTF-8'
       });
       let options = {
           headers : headers
       }
       return this.http.post(this.server + file, JSON.stringify(body), options)
       .timeout(59000) //59 sec timeout
       .map(res=>res);
   }
}
