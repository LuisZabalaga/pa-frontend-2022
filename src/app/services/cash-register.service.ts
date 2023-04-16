import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'cash-register';

  //Get cash register for date
  getCashRegisterForDate(inicial:any, final:any) {
    let inicials = inicial;
    let finals = final;
    return this._httpClient.get(`${this.apiUrl}/${inicials}/${finals}`);
  }

  //Get all cash register for state
  getTotalCashRegisterForState(estado:any, inicial:any, final:any) {
    let inicials = inicial;
    let finals = final;
    let estados = estado;
    return this._httpClient.get(`${this.apiUrl}/${estados}/${inicials}/${finals}`);
  }

  //Get all cash register
  getAllData():Observable<any> {
    return this._httpClient.get(`${this.apiUrl}`);
  }

  //Add new cash register
  createData(data:any):Observable<any> {
    return this._httpClient.post(`${this.apiUrl}`, data);
  }

  //Update cash register for ID
  updateData(data:any, id:any):Observable<any> {
    let ids = id;
    return this._httpClient.put(`${this.apiUrl}/${ids}`, data);
  }

  //Get single data
  // getSingleData(id:any):Observable<any> {
  //   let ids = id;
  //   return this._httpClient.get(`${this.apiUrl}/${ids}`);
  // }

  //Delete cash register for ID
  deleteData(id:any, desc:any):Observable<any> {
    let ids = id;
    let descr = desc;
    return this._httpClient.delete(`${this.apiUrl}/${ids}/${descr}`);
  }

}
