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

  //Get Products for Category
  getProductsForCategory(category: any):Observable<any> {
    let categ = category;
    return this._httpClient.get(`${this.apiUrl}/${categ}`);
  }

}
