import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'purchases';

  //Get all purchases
  getAllData(inicial: any, final: any):Observable<any> {
    let inicia = inicial;
    let fina = final;
    return this._httpClient.get(`${this.apiUrl}/${inicial}/${final}`);
  }

  getPurchaseForId(id: any) {
    let ids = id;
    return this._httpClient.get(`${this.apiUrl}/${ids}`);
  }

  //Add new purchase
  createData(data:any):Observable<any> {
    console.log(data, 'createapi=>');
    return this._httpClient.post(`${this.apiUrl}`, data);
  }

  //Update purchase for ID
  updateData(data:any, id:any):Observable<any> {
    let ids = id;
    return this._httpClient.put(`${this.apiUrl}/${ids}`, data);
  }

  //Get single data
  // getSingleData(id:any):Observable<any> {
  //   let ids = id;
  //   return this._httpClient.get(`${this.apiUrl}/${ids}`);
  // }

  //Delete purchase for ID
  deleteData(id:any):Observable<any> {
    let ids = id;
    return this._httpClient.delete(`${this.apiUrl}/${ids}`);
  }

}
