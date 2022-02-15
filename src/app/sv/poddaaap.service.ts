import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { data,number_data } from '../models/data_model';
import { FeedBack } from '../models/feedback';
import {ConfigddaaapService} from './configddaaap.service';

@Injectable({
  providedIn: 'root'
})
export class PoddaaapService {

  constructor(private http: HttpClient, private configSv: ConfigddaaapService) { }


  getpo_edit(id): Observable<data> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'posend.php';
    let data;
    data = {
      'id': id,
      'type_sql': 'read'
    }
    return this.http.post<data>(apiUrl, data, { headers: header });
  }

  crudtf_cfwin(vdata: any, type: string, cause?): Observable<FeedBack> {
    const header = { 'Content-Type': 'application/json' };
    const apiUrl = this.configSv.ip + 'tf_cfwin.php';
    let data;
    console.log(vdata);
      data = {
        'poid' : vdata.poid,
        'assign_type' : vdata.assign_type,
        'payment_date' : vdata.payment_date,
        'payment_total' : vdata.moneypay,
        'typepayment' : vdata.typepayment.id,
        'cashmoney_0' : vdata.cashmoney_0,
        'change_0' : vdata.change_0,
        'ems_2' : vdata.ems_2,  
        'payment_cancel_3' : vdata.payment_cancel_3, 
        'problem_cause_4' : vdata.problem_cause_4, 
        'tmpproduct' : vdata.tmpproduct,
        'pic' : vdata.picresizbase64List,
        'type_sql': type
      }
    
    return this.http.post<FeedBack>(apiUrl, data, { headers: header });
  }
}
