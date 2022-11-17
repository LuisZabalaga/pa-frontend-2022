import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvancesStateService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'advances-state';

  //Change State of advances for a Provider
  changeStateForAdvanceToProvider(provider: any) {
    let providers = provider;
    return this._httpClient.get(`${this.apiUrl}/${providers}`);
  }

  //Change State of advances for a Customer
  changeStateForAdvanceToCustomer(state: any, customer: any) {
    let states = state;
    let customers = customer;
    return this._httpClient.get(`${this.apiUrl}/${states}/${customers}`);
  }

  //Get last advance Id
  getLastAdvanceId() {
    return this._httpClient.get(`${this.apiUrl}`);
  }

}
