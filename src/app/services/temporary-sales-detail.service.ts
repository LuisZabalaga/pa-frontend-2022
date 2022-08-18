import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemporarySalesDetailService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'temporary-sales-detail';

  //Get all temporary sales details
  getAllData():Observable<any> {
    return this._httpClient.get(`${this.apiUrl}`);
  }

  //Get total temporary sales details
  getTotalData():Observable<any> {
    return this._httpClient.get(`${this.apiUrl}/to`);
  }

  //Add new temporary sale detail
  createData(data:any):Observable<any> {
    console.log(data, 'createapi=>');
    return this._httpClient.post(`${this.apiUrl}`, data);
  }

  // Update Weight for sales
  addWeightSale(peso_venta:any, producto:any):Observable<any> {
    let peso = peso_venta;
    let prod = producto;
    return this._httpClient.delete(`${this.apiUrl}/${peso}/${prod}`);
  }

  // Update Weight for sales
  diminishWeightSale(peso_venta:any, producto:any):Observable<any> {
    let peso = peso_venta;
    let prod = producto;
    return this._httpClient.get(`${this.apiUrl}/${peso}/${prod}`);
  }

  //Delete temporary sales details for ID
  deleteData(id:any):Observable<any> {
    let ids = id;
    return this._httpClient.delete(`${this.apiUrl}/${ids}`);
  }
}
