import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
// import { Usuario } from 'src/app/interfaces/usuario';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  listUsuarios: any;

  displayedColumns: string[] = ['posicion', 'nombres', 'email', 'celular', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiserviceService,
    private _toastService: ToastService) { }

  ngOnInit(): void {

    this.cargarUsuarios();
  }

  cargarUsuarios(){
    this.apiService.getAllData().subscribe(res => {
    this.listUsuarios = res.data;  
    this.dataSource = new MatTableDataSource(this.listUsuarios);
    });
  }

  eliminarUsuario(id:any) {
    console.log(id, 'deleteid ==>');
    this.apiService.deleteData(id).subscribe(() => {
      this._toastService.error('Usuario Eliminado con exicto!!!');
      this.cargarUsuarios();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
