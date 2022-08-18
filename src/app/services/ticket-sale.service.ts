import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TicketSaleService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'ticket-sale';

  //Get all sales for date
  getAllData():Observable<any> {
    return this._httpClient.get(`${this.apiUrl}`);
  }

  //Add new sale
  createData(data:any):Observable<any> {
    console.log(data, 'create ticket-sale=>');
    return this._httpClient.post(`${this.apiUrl}`, data);
  }

}
