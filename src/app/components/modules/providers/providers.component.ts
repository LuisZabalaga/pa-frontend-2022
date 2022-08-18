import { Component, OnInit, ViewChild } from '@angular/core';
import { ProvidersService } from '../../../services/providers.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'angular-toastify';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProviderDialogComponent } from './provider-dialog/provider-dialog.component';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.css']
})
export class ProvidersComponent implements OnInit {

  listProviders: any;

  displayedColumns: string[] = ['posicion', 'nombres', 'razonsocial', 'ruc', 'email', 'celular', 'ciudad', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private providersService: ProvidersService,
    private _toastService: ToastService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.getAllProviders();
    
  }

  getAllProviders(){
    this.providersService.getAllData().subscribe(res => {
    this.listProviders = res;
    console.log("hello");
    console.log(res);
    this.dataSource = new MatTableDataSource(this.listProviders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  deleteOneProvider(id:any) {
    console.log(id, 'deleteid ==>');
    this.providersService.deleteData(id).subscribe({
      next: (res) => {
        this._toastService.warn('Proveedor Eliminado Satisfactoriamente!!!');
        this.getAllProviders();
      },
      error: () => {
        this._toastService.error('Error!!! No se puede Eliminar Proveedor!!');
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

  openDialogAddProvider() {
    this.dialog.open(ProviderDialogComponent , {
      // width: '30%',
    }).afterClosed().subscribe(value =>{
      if(value === 'save') {
        this.getAllProviders();
      }
    });
  }

  openDialogEditProvider(element: any ) {
    this.dialog.open(ProviderDialogComponent, {
      // width: '30%',
      data: element
    }).afterClosed().subscribe(value =>{
      if(value === 'update') {
        this.getAllProviders();
      }
    });
  }

}
