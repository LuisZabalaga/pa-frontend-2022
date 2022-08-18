import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemporaryPurchaseDetailService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'temporary-purchase-detail';

  //Get all temporary purchases details
  getAllData():Observable<any> {
    return this._httpClient.get(`${this.apiUrl}`);
  }

  //Get total temporary purchases details
  getTotalData():Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/to`);
  }

  //Add new temporary purchases details
  createData(data:any):Observable<any> {
    console.log(data, 'createapi=>');
    return this._httpClient.post(`${this.apiUrl}`, data);
  }

  // Udate Weight for purchases 
  addWeightPurchase(peso_venta:any, producto:any):Observable<any> {
    let peso = peso_venta;
    let prod = producto;
    return this._httpClient.get(`${this.apiUrl}/${peso}/${prod}`);
  }

  // Udate Weight for purchases 
  diminishWeightPurchase(peso_venta:any, producto:any):Observable<any> {
    let peso = peso_venta;
    let prod = producto;
    return this._httpClient.delete(`${this.apiUrl}/${peso}/${prod}`);
  }

  //Get single data
  // getSingleData(id:any):Observable<any> {
  //   let ids = id;
  //   return this._httpClient.get(`${this.apiUrl}/${ids}`);
  // }

  //Delete temporary purchases details for ID
  deleteData(id:any):Observable<any> {
    let ids = id;
    return this._httpClient.delete(`${this.apiUrl}/${ids}`);
  }

}
