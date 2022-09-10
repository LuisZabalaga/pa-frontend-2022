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

  //Add new temporary purchases details
  createData(data:any):Observable<any> {
    return this._httpClient.post(`${this.apiUrl}`, data);
  }

  //Delete temporary purchases details for ID
  deleteData():Observable<any> {
    return this._httpClient.delete(`${this.apiUrl}`);
  }

}
