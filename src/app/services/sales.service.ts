import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'sales';

  //Get all sales for date
  getAllData(inicial: any, final: any):Observable<any> {
    let inicia = inicial;
    let fina = final;
    return this._httpClient.get(`${this.apiUrl}/${inicia}/${fina}`);
  }

  //Get sales for Id
  getSalesForId(id: any) {
    let ids = id;
    return this._httpClient.get(`${this.apiUrl}/${ids}`);
  }

  //Add new sale
  createData(data:any):Observable<any> {
    console.log(data, 'createapi=>');
    return this._httpClient.post(`${this.apiUrl}`, data);
  }

  //Update sale for ID
  // updateData(data:any, id:any):Observable<any> {
  //   let ids = id;
  //   return this._httpClient.put(`${this.apiUrl}/${ids}`, data);
  // }

  //Get single data
  // getSingleData(id:any):Observable<any> {
  //   let ids = id;
  //   return this._httpClient.get(`${this.apiUrl}/${ids}`);
  // }

  //Delete sale for ID
  deleteData(id:any):Observable<any> {
    let ids = id;
    return this._httpClient.delete(`${this.apiUrl}/${ids}`);
  }

}
