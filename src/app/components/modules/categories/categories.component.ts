import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from '../../../services/categories.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'angular-toastify';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategorieDialogComponent } from './categorie-dialog/categorie-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  updateCategories: any;

  displayedColumns: string[] = ['posicion', 'nombres', 'descripcion', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private categoriesService: CategoriesService,
    private _toastService: ToastService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.getAllCategories();
    
  }

  getAllCategories(){
    this.categoriesService.getAllData().subscribe(res => {
    this.updateCategories = res;
    console.log("hello");
    console.log(res);
    this.dataSource = new MatTableDataSource(this.updateCategories);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  deleteOneCategorie(id:any) {
    console.log(id, 'deleteid ==>');
    this.categoriesService.deleteData(id).subscribe({
      next: (res) => {
        this._toastService.warn('Categoria Eliminada Satisfactoriamente!!!');
        this.getAllCategories();
      },
      error: () => {
        this._toastService.error('Error!!! No se puede Eliminar Categoria!!!');
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

  openDialogAddCategorie() {
    this.dialog.open(CategorieDialogComponent , {
      // width: '30%',
    }).afterClosed().subscribe(value =>{
      if(value === 'save') {
        this.getAllCategories();
      }
    });
  }

  openDialogEditCategorie(element: any ) {
    this.dialog.open(CategorieDialogComponent, {
      // width: '30%',
      data: element
    }).afterClosed().subscribe(value =>{
      if(value === 'update') {
        this.getAllCategories();
      }
    });
  }

}
