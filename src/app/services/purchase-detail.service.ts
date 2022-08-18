import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseDetailService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'purchases-detail';

  //Get all temporary purchases details
  getAllData(id: any):Observable<any> {
    let ids = id;
    return this._httpClient.get(`${this.apiUrl}/${ids}`);
  }

  //Get total temporary purchases details
  // getTotalData():Observable<any> {
  //   return this._httpClient.get(`${this.apiUrl}/to`);
  // }

  //Add new temporary purchases details
  createData(data:any):Observable<any> {
    // console.log(data, 'createapi=>');
    return this._httpClient.put(`${this.apiUrl}`, data);
  }

  //Delete temporary purchases details for ID
  deleteData():Observable<any> {
    // let ids = id;
    return this._httpClient.delete(`${this.apiUrl}`);
  }

  //Update temporary purchases details for ID
  // updateData(data:any, id:any):Observable<any> {
  //   let ids = id;
  //   return this._httpClient.put(`${this.apiUrl}/${ids}`, data);
  // }

  //Get single data
  // getSingleData(id:any):Observable<any> {
  //   let ids = id;
  //   return this._httpClient.get(`${this.apiUrl}/${ids}`);
  // }

  //Delete temporary purchases details for ID
  // deleteData(id:any):Observable<any> {
  //   let ids = id;
  //   return this._httpClient.delete(`${this.apiUrl}/${ids}`);
  // }

}
