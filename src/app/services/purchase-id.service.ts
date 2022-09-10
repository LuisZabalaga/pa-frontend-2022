import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseIdService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'purchase-id';

  //Get last id purchase
  getLastPurchaseId():Observable<any> {
    return this._httpClient.get(`${this.apiUrl}`);
  }

}
