import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeightProductsService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'weight-products';

  //Get all weight products
  getAllWeightProducts():Observable<any> {
    return this._httpClient.get(`${this.apiUrl}`);
  }

  //Add new weight products
  addWeightProductForId(data:any):Observable<any> {
    return this._httpClient.post(`${this.apiUrl}`, data);
  }

  //Delete all weight products
  deleteAllWeightProducts():Observable<any> {
    return this._httpClient.delete(`${this.apiUrl}`);
  }

  //Delete one weight products
  deleteOneWeightProduct(id:any):Observable<any> {
    let ids = id;
    return this._httpClient.delete(`${this.apiUrl}/${ids}`);
  }

}
