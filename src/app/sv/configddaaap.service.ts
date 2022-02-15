import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController, LoadingController,NavController } from '@ionic/angular';
//import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
//import { File } from '@awesome-cordova-plugins/file/ngx';
@Injectable({
  providedIn: 'root'
})
export class ConfigddaaapService {
   // ip = 'http://localhost:8012/ws_dda/'; // test
   public ip = 'https://www.duangdeewin.com/ws_dda/'; //production
  constructor(private loadingController: LoadingController,private alertCtrl: AlertController) { }


  async loadingAlert(dur:number) {
    const loading = await this.loadingController.create({
      spinner: 'bubbles',
      message: 'กำลังโหลดข้อมูล...',
      duration: dur
    });
    return await loading.present();
   
   // return loading;
  } 

  async ChkformAlert(text:string){
    const alert = await this.alertCtrl.create({
      message: text,
      buttons: ['ตกลง']
      });
      return await alert.present();
  }
}
 