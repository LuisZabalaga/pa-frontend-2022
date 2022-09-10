import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaleIdService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'sale-id';

  //Get last id sale
  getLastSaleId():Observable<any> {
    return this._httpClient.get(`${this.apiUrl}`);
  }

}
