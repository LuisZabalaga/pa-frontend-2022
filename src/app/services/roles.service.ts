import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private _httpClient: HttpClient) { }

  // connect frontend to backend
  private apiUrl = environment.url+'roles';

  //Get all Roles
  getAllData():Observable<any> {
    return this._httpClient.get(`${this.apiUrl}`);
  }

  //Add new role
  createData(data:any):Observable<any> {
    console.log(data, 'createapi=>');
    return this._httpClient.post(`${this.apiUrl}`, data);
  }

  //Update role for ID
  updateData(data:any, id:any):Observable<any> {
    let ids = id;
    return this._httpClient.put(`${this.apiUrl}/${ids}`, data);
  }

  //Get single data
  // getSingleData(id:any):Observable<any> {
  //   let ids = id;
  //   return this._httpClient.get(`${this.apiUrl}/${ids}`);
  // }

  //Delete role for ID
  deleteData(id:any):Observable<any> {
    let ids = id;
    return this._httpClient.delete(`${this.apiUrl}/${ids}`);
  }

}
