import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'reports';

  //Get Weight of Products for Category
  getWeightOfProductsForCategory(category: any):Observable<any> {
    let categ = category;
    return this._httpClient.get(`${this.apiUrl}/${categ}`);
  }

  //Get Total for Categories
  getTotalPurchaseForCategorieAndDate(category:any, initial:any, final:any):Observable<any> {
    let categ = category;
    let init = initial;
    let fin = final;
    return this._httpClient.get(`${this.apiUrl}/${categ}/${init}/${fin}`);
  }

}
