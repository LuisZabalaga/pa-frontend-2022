import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvancesCustomerService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'advances-customer';

  //Get advances for a Customer
  getAdvanceForCustomerAndState(customer: any) {
    let cust = customer;
    return this._httpClient.get(`${this.apiUrl}/${cust}`);
  }


}
