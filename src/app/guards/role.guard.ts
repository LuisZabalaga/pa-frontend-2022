import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../services/users.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private usersService: UsersService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    // const [ 'emp_usuario', 'emp_rol_ID' ] = decode(token);
    const dataToken = decode(token);
    if (!this.usersService.isAuth() || dataToken['emp_rol_ID'] !== expectedRole) {
    // if (emp_rol_ID !== expectedRole) {
      console.log('Usuario no autorizado para la vista');
      return false;
    } 
    console.log('Usuario Autorizado');
    return true;
    
  }
  
}
