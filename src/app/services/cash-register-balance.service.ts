import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterBalanceService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'cash-register-balance';

  //Get cash register for date
  getAllCashRegisterBalanceByDate(inicial:any, final:any) {
    let inicials = inicial;
    let finals = final;
    return this._httpClient.get(`${this.apiUrl}/${inicials}/${finals}`);
  }

  //Get all cash register for state
  getLastCashRegisterBalance() {
    return this._httpClient.get(`${this.apiUrl}`);
  }

  //Add new cash register
  addNewCashRegisterBalance(data:any):Observable<any> {
    return this._httpClient.post(`${this.apiUrl}`, data);
  }

  //Change state of cash register balance
  changeStateCashRegisterBalance(id:any, state:any, data:any):Observable<any> {
    let ids = id;
    let states = state;
    return this._httpClient.put(`${this.apiUrl}/${ids}/${states}`, data);
  }

  //Update cash register for ID
  editOneCashRegisterBalance(data:any, id:any):Observable<any> {
    let ids = id;
    return this._httpClient.put(`${this.apiUrl}/${ids}`, data);
  }

  //Delete cash register for ID
  deleteOneCashRegisterBalance(id:any):Observable<any> {
    let ids = id;
    return this._httpClient.delete(`${this.apiUrl}/${ids}`);
  }
}
