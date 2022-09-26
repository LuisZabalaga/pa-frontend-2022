import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  displayElement: boolean = true;
  user: any;
  rol: any;

  constructor() { }

  ngOnInit(): void {
    this.changeVisibilityOfLinks();
  }
  
  changeVisibilityOfLinks() {
    const token = localStorage.getItem('token');
    const dataToken = decode(token);
    // const { emp_nombres, emp_apellidos, emp_usuario, emp_rol_ID } = decode(token);
    this.user = dataToken['emp_nombres'] + ' ' + dataToken['emp_apellidos'];
    this.rol = dataToken['emp_rol_ID'];
    if (dataToken['emp_rol_ID'] !== 1){
      this.displayElement = false;
    }
    
  }
}
