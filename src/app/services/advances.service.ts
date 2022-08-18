import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvancesService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'advances';

  //Get all sales
  getAllData():Observable<any> {
    return this._httpClient.get(`${this.apiUrl}`);
  }

  //Get advances for customer and date
  getAdvancesForProvidersAndDate(inicial:any, final:any) {
    let inicials = inicial;
    let finals = final;
    return this._httpClient.get(`${this.apiUrl}/${inicials}/${finals}`);
  }

  //Get advances for customer and date
  getTotalAdvancesForCustomerAndDate(cusCode:any, inicial:any, final:any) {
    let cusCod = cusCode;
    let inicials = inicial;
    let finals = final;
    return this._httpClient.get(`${this.apiUrl}/${cusCod}/${inicials}/${finals}`);
  }

  //Get advances for customer and date
  getTotalAdvancesForCustomerAndDateAndState(cusCode:any, state: any, inicial:any, final:any) {
    let cusCod = cusCode;
    let states = state;
    let inicials = inicial;
    let finals = final;
    return this._httpClient.get(`${this.apiUrl}/${cusCod}/${states}/${inicials}/${finals}`);
  }

  //Get advances for ID Customer and date
  getAdvancesForIdCustomerAndDate(cusCode:any, cusId:any, state:any, inicial:any, final:any) {
    let cusCo = cusCode;
    let cusIds = cusId;
    let states = state;
    let inicials = inicial;
    let finals = final;
    return this._httpClient.get(`${this.apiUrl}/${cusCo}/${cusIds}/${states}/${inicials}/${finals}`);
  }

  //Get advances for a Provider
  getAdvanceForProvider(provider: any) {
    let prov = provider;
    return this._httpClient.get(`${this.apiUrl}/${prov}`);
  }

  //Add new advance
  createData(data:any):Observable<any> {
    console.log(data, 'createapi=>');
    return this._httpClient.post(`${this.apiUrl}`, data);
  }

  //Update advance for ID
  updateData(data:any, id:any):Observable<any> {
    let ids = id;
    return this._httpClient.put(`${this.apiUrl}/${ids}`, data);
  }

  //Get single data
  // getSingleData(id:any):Observable<any> {
  //   let ids = id;
  //   return this._httpClient.get(`${this.apiUrl}/${ids}`);
  // }

  //Delete advance for ID
  deleteData(id:any):Observable<any> {
    let ids = id;
    return this._httpClient.delete(`${this.apiUrl}/${ids}`);
  }
  
}
