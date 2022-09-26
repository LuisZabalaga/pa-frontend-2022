import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private _httpClient: HttpClient,
    private jwtHelperService: JwtHelperService,
  ) { }

  //Connect frontend to backend
  private apiUrl = environment.url+'users';

 //Get Users Data
 getEmployeeForUser(data: any):Observable<any> {
  return this._httpClient.post(`${this.apiUrl}/`, data);
 }

 isAuth():boolean {
  const token = localStorage.getItem('token');
  if (this.jwtHelperService.isTokenExpired(token) || !localStorage.getItem('token')) {
    return false
  }
  return true;
 }

}
