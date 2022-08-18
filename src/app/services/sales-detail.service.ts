import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesDetailService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'sales-detail';

  //Get all sales detail details
  getAllData(id: any):Observable<any> {
    let ids = id;
    return this._httpClient.get(`${this.apiUrl}/${ids}`);
  }

  //Add all sales detail
  createData(data:any):Observable<any> {
    console.log(data, 'venta creada =>');
    return this._httpClient.put(`${this.apiUrl}`, data);
  }

  //Delete all sales detail
  deleteData():Observable<any> {
    // let ids = id;
    return this._httpClient.delete(`${this.apiUrl}`);
  }

}
