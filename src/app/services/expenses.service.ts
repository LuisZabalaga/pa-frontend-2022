import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'expenses';

  //Get all expenses for date
  getAllExpensesForDate(inicial:any, final:any) {
    let inicials = inicial;
    let finals = final;
    return this._httpClient.get(`${this.apiUrl}/${inicials}/${finals}`);
  }

  //Get all Expenses
  getAllData():Observable<any> {
    return this._httpClient.get(`${this.apiUrl}`);
  }

  //Add new expense
  createData(data:any):Observable<any> {
    console.log(data, 'createapi=>');
    return this._httpClient.post(`${this.apiUrl}`, data);
  }

  //Update expense for ID
  updateData(data:any, id:any):Observable<any> {
    let ids = id;
    return this._httpClient.put(`${this.apiUrl}/${ids}`, data);
  }

  //Get single data
  // getSingleData(id:any):Observable<any> {
  //   let ids = id;
  //   return this._httpClient.get(`${this.apiUrl}/${ids}`);
  // }

  //Delete expense for ID
  deleteData(id:any):Observable<any> {
    let ids = id;
    return this._httpClient.delete(`${this.apiUrl}/${ids}`);
  }

}
