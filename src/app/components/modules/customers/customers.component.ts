import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../../services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'angular-toastify';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  listUsuarios: any;

  displayedColumns: string[] = ['posicion', 'nombres', 'dni', 'ruc', 'email', 'celular', 'direccion','ciudad', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private customerService: CustomerService,
    private _toastService: ToastService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.gellAllClients();
    
  }

  gellAllClients(){
    this.customerService.getAllData().subscribe(res => {
    this.listUsuarios = res;
    console.log("hello");
    console.log(res);
    this.dataSource = new MatTableDataSource(this.listUsuarios);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  deleteOneClient(id:any) {
    console.log(id, 'deleteid ==>');
    this.customerService.deleteData(id).subscribe({
      next: (res) => {
        this._toastService.warn('Cliente Eliminado Satisfactoriamente!!!');
        this.gellAllClients();
      },
      error: () => {
        this._toastService.error('Error!!! No se puede Eliminar Cliente!!');
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

  openDialogAddClient() {
    this.dialog.open(DialogComponent, {
      // width: '30%',
    }).afterClosed().subscribe(value =>{
      if(value === 'save') {
        this.gellAllClients();
      }
    });
  }

  openDialogEditClient(element: any ) {
    this.dialog.open(DialogComponent, {
      // width: '30%',
      data: element
    }).afterClosed().subscribe(value =>{
      if(value === 'update') {
        this.gellAllClients();
      }
    });
  }


}

