import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../../../services/employees.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'angular-toastify';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EmployeesDialogComponent } from './employees-dialog/employees-dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  listEmployees: any;

  displayedColumns: string[] = ['posicion', 'nombres', 'dni', 'email', 'celular', 'ciudad', 'estado', 'fecha', 'rol', 'usuario', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private employeesService: EmployeesService,
    private _toastService: ToastService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.getAllEmployees();
    
  }

  getAllEmployees(){
    this.employeesService.getAllData().subscribe(res => {
    this.listEmployees = res;
    console.log("hello");
    console.log(res);
    this.dataSource = new MatTableDataSource(this.listEmployees);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  deleteOneEmployee(id:any) {
    console.log(id, 'deleteid ==>');
    this.employeesService.deleteData(id).subscribe({
      next: (res) => {
        this._toastService.warn('Empleado Eliminado Satisfactoriamente!!!');
        this.getAllEmployees();
      },
      error: () => {
        this._toastService.error('Error!!! No se puede Eliminar Empleado!!!');
      }
      
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogAddEmployee() {
    this.dialog.open(EmployeesDialogComponent , {
      // width: '30%',
    }).afterClosed().subscribe(value =>{
      if(value === 'save') {
        this.getAllEmployees();
      }
    });
  }

  openDialogEditEmployee(element: any ) {
    this.dialog.open(EmployeesDialogComponent, {
      // width: '30%',
      data: element
    }).afterClosed().subscribe(value =>{
      if(value === 'update') {
        this.getAllEmployees();
      }
    });
  }

}
