import { Component, OnInit,Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl,FormArray } from "@angular/forms";
//import { NavController,AlertController } from '@ionic/angular';
import { Subscription } from "rxjs";
import { IonicSelectableComponent } from 'ionic-selectable';
import {ConfigddaaapService} from '../sv/configddaaap.service';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import * as moment_ from 'moment';
import 'moment/locale/th';   
import {PoddaaapService} from '../sv/poddaaap.service';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

const moment = moment_;

@Component({
  selector: 'app-podda01',
  templateUrl: './podda01.page.html',
  styleUrls: ['./podda01.page.scss'],
})
export class Podda01Page implements OnInit {
  //@Input() po_running:string;
  public id: string;
  ionicForm: FormGroup;ionicFormPayment: FormGroup;
  sub: Subscription;isSubmitted = false; paymenttype:number;
  src:any;modepayment = null;
  portControl_payment: FormControl; ports_payment: any;
  datePickerObj: any = {};
  tmpproduct =[];discount = []; commentproduct = [];
  tmpproductetc = []; //picpreview =[];
  allDiscount = 0;alltotalproduct=0;po_shipping_price=0;alltotal=0;
  indexpic = 0;
  versionNumber: string | number;
  @ViewChild('fileIngimg1') fileIngimg1: ElementRef;
  constructor(private navCtrl: NavController,public formBuilder: FormBuilder,
    public configSv: ConfigddaaapService,public poddaSv:PoddaaapService,
    private alertCtrl: AlertController,private modalCtrl:ModalController,private activatedRoute: ActivatedRoute,private iab: InAppBrowser) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.loadform();
    this.loadform_payment();
    this.loaddata_edit();
  }

  loadform(){
    this.ionicForm = this.formBuilder.group({
      id:[this.id], 
      po_running:[""],
      po_date:[moment().format('DD/MM/YYYY'),[Validators.required]],
      nickname:[""],
      po_namewin: ["",[Validators.required]],
      area_name: [""],
      po_customertype :  [""],
      po_customer:[""], 
      po_customer_tel:[""],
      po_green: [""],
      po_totalproduct:[""],
      po_discount:[""],
      po_total:[""],
      po_add:[""],
      po_recivedate:["",[Validators.required]],
      shipping_name:[""],
      po_shipping_price:["",[Validators.required]],
      po_address:[""],
      po_address_place:[""],
      tmpproduct:["",[Validators.required]],
      po_ems:[""],
      po_status:[""],
      po_transferdate:[""],
      oldtmpproduct:[""],
      namewin_comment:[""],
      po_deposit:["0"],
    });
  }

  loadform_payment(){
    this.portControl_payment = this.formBuilder.control("", Validators.required);
    this.picresizbase64Array = this.formBuilder.array([]);
    this.ionicFormPayment = this.formBuilder.group({
      poid : [this.id],
      //assign_type :[this.assign_type],
      assign_type :[""],
      typepayment: this.portControl_payment,
      payment_date:[ moment().format('DD/MM/YYYY') ,[Validators.required]],
      moneypay: [""],
      cashmoney_0:[""],
      change_0:[""],
      ems_2:[""],
      payment_cancel_3:[""],
      problem_cause_4:[""],
      tmpproduct:[""],
      picresizbase64List: this.picresizbase64Array,
    }); 
   
    this.loaddata_paymenttype();
  }

  get errorControl_Payment() {
    return this.ionicFormPayment.controls;
  }



  loaddata_paymenttype(){
    this.ports_payment = [
      {id: 0,typeserch: 'เงินสด'},
      {id: 1,typeserch: 'โอนเงิน'},
      {id: 2,typeserch: 'พัสดุ'},
      {id: 3,typeserch: 'ยกเลิกการส่ง'},
      {id: 4,typeserch: 'งานมีปัญหา'},
    ];
    //console.log(this.ports);
  }

  portChange_payment(event: {
    component: IonicSelectableComponent,
    value: any
  }) {
    this.ionicFormPayment.setValidators(null);
    let port = event.value; 
    this.paymenttype = port['id'];
    this.ionicFormPayment.controls['cashmoney_0'].setValidators(null);
    this.ionicFormPayment.controls['change_0'].setValidators(null);
    this.picresizbase64Array.setValidators(null);
    this.ionicFormPayment.controls['ems_2'].setValidators(null);
    this.ionicFormPayment.controls['payment_cancel_3'].setValidators(null);
    this.ionicFormPayment.controls['problem_cause_4'].setValidators(null);
    this.ionicFormPayment.controls['cashmoney_0'].updateValueAndValidity();
    this.ionicFormPayment.controls['change_0'].updateValueAndValidity();
    this.ionicFormPayment.controls['ems_2'].updateValueAndValidity();
    this.ionicFormPayment.controls['payment_cancel_3'].updateValueAndValidity();
    this.ionicFormPayment.controls['problem_cause_4'].updateValueAndValidity();
    this.picresizbase64Array.updateValueAndValidity();
    if(this.paymenttype === 0){
      this.ionicFormPayment.get('cashmoney_0').setValidators(Validators.required);
      this.ionicFormPayment.get('change_0').setValidators(Validators.min(0));
    }
    else if(this.paymenttype === 1){
      this.src = "./assets/img/qr_payment.jpg";
      //this.ionicFormPayment.get('picresizbase64List').setValidators(Validators.required);
      this.picresizbase64Array.setValidators(Validators.required);
      this.picresizbase64Array.updateValueAndValidity();
    }
    else if(this.paymenttype === 2){
      this.ionicFormPayment.get('ems_2').setValidators(Validators.required);
    }
    else if(this.paymenttype === 3){
      this.ionicFormPayment.get('payment_cancel_3').setValidators(Validators.required);
    }
    else if(this.paymenttype === 4){
      this.ionicFormPayment.get('problem_cause_4').setValidators(Validators.required);
      
    }
   
  }

  picresizbase64Array: FormArray; picresizbase64:any;  picpreview =[];indexpic_payment = 0; showrowpaymenttype1:boolean= true;
  fileUpload_payment() {
   this.fileIngimg1.nativeElement.click();
  }

  fileUpload_imgpayment(event) {
    const fileList: FileList =  this.fileIngimg1.nativeElement.files;
    //console.log(fileList[0].type);
    if (typeof fileList[0] !== 'undefined') {
      if (fileList[0].type.match(/image.*/)) {
        var reader = new FileReader();
        var self = this;
        reader.onloadend = function () {
          //self.picbase64 = reader.result
          var canvas = document.createElement("canvas");
          var ctx = canvas.getContext("2d");
          canvas.width = 200; // target width
          canvas.height = 200; // target height
          var image = new Image();
          image.src = reader.result as string;
          image.onload = function (e) {
            ctx.drawImage(image,
              0, 0, image.width, image.height,
              0, 0, canvas.width, canvas.height
            );
            var resampledImage = new Image();
            resampledImage.src = canvas.toDataURL();
            self.picresizbase64 = resampledImage.src;
              self.picpreview.push({
                id:self.indexpic_payment,
                url:resampledImage.src
              });
              
             self.picresizbase64Array.push(self.formBuilder.group({
                id:[self.indexpic_payment],
                url: [self.picresizbase64],
               
              }));
              self.indexpic_payment++;
          };
        }
        reader.readAsDataURL(fileList[0]);
      }
      else {
        alert('กรุณาระบุชนิดไฟล์รูปภาพ');
      }
    }
 }
 
  delImg_payment(index){
   this.picpreview = this.picpreview.filter(obj => obj.id !== index);
  this.picresizbase64Array.removeAt(this.picresizbase64Array.value.findIndex(value => value.id === index));
  }
 
 


  async submitForm_Payment() {
    this.ionicFormPayment.controls['tmpproduct'].setValue(this.ionicForm.controls['oldtmpproduct'].value);
    console.log(this.ionicFormPayment.value)
    this.isSubmitted = true;
    if (!this.ionicFormPayment.valid ) {
      console.log("Please provide all the required values!");
      return false;
    } else {
      const confirm =  await this.alertCtrl.create({
      header: 'ยืนยันการบันทึกการส่งสินค้า ' + this.ionicForm.controls.po_running.value + ' ถ้ากด ตกลง จะไม่สามารถแก้ไขได้แล้ว',
     // message: 'แน่ใจว่าต้องการลบใบสั่งซื้อที่ '+ this.po_running +' ? ',
      buttons: [{
        text: 'ยกเลิก',
        handler: (data: any) => {
           console.log('cancel ',data);
        }
      },
      {
        text: 'ตกลง',
          handler: (data: any) => {
             this.sub = this.poddaSv.crudtf_cfwin(this.ionicFormPayment.value,'insert').subscribe(
              (data) => { 
                if(data.status == 'ok')
                {   
                  this.configSv.ChkformAlert(data.message);
                  this.modepayment = 0;
                }
                else
                {
                  this.configSv.ChkformAlert(data.message);
                }              
              }, (error) => {
                console.log(JSON.stringify(error));
              }
            );
        }
      }]
    });
    confirm.present();
  }


 }


 loaddata_edit(){
  //console.log(this.id);
   if(typeof this.id !== 'undefined'){
    // console.log(this.id);
     this.sub = this.poddaSv
     .getpo_edit(this.id)
     .subscribe((data) => {
       //console.log(data);
       data.data_detail.forEach((item) => {
        for (const [key, value] of Object.entries(item)) {
          this.ionicForm.controls[key].setValue(value);
        }
        this.tmpproduct = data.data_detail[0]['tmpproduct'];
        this.allDiscount = data.data_detail[0]['po_discount'];
        this.alltotalproduct = data.data_detail[0]['po_totalproduct'];
        this.alltotal = data.data_detail[0]['po_total'];
        this.tmpproduct.forEach((item,index) => {
          this.discount[item['id']] = item['discount'];
          this.commentproduct[item['id']] = item['commentproduct'];
          item['picresizbase64List'].forEach(element => {
            this.indexpic = element['indexpic'];
          });
        });

        let moneypad = Number(data.data_detail[0]['po_total']) - Number(data.data_detail[0]['po_deposit']);
        this.ionicFormPayment.controls['moneypay'].setValue(moneypad);
        this.indexpic++


       });
     
     }
     );
   }
 }

 showImg(detail_id,name){
  let url = this.configSv.ip + 'po01/productdetail/' + detail_id + '/' +  name
  const browser = this.iab.create(url).show();
 }

 cul_cashmoney_0(value){
  let total =  Number(value) - Number(this.ionicFormPayment.controls['moneypay'].value);
  this.ionicFormPayment.controls['change_0'].setValue(total);
 
}

ionViewWillEnter() {
  const aux: any = document.getElementsByTagName('META');
  // tslint:disable-next-line:prefer-for-of
  for (let i = 0; i < aux.length; i++) {
    if (aux[i].name === 'version') {
      this.versionNumber = aux[i].content;
    }
  }
}
}
