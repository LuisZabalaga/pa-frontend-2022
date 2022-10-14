import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { CategoriesService } from '../../../services/categories.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'angular-toastify';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  listProducts: any;

  displayedColumns: string[] = ['posicion', 'nombres', 'descripcion', 'categoria_id', 'peso_total', 'peso_aqp', 'peso_local', 'imagen', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private _toastService: ToastService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.getAllProducts();
    
  }

  getAllProducts(){
    this.productsService.getAllData().subscribe(res => {
    this.listProducts = res;
    this.dataSource = new MatTableDataSource(this.listProducts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  deleteOneProduct(id:any) {
    this.productsService.deleteData(id).subscribe({
      next: (res) => {
        this._toastService.warn('Producto Eliminado Satisfactoriamente!!!');
        this.getAllProducts();
      },
      error: () => {
        this._toastService.error('Error!!! No se puede Eliminar Producto!!');
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

  openDialogAddProduct() {
    this.dialog.open(ProductDialogComponent , {
      // width: '30%',
    }).afterClosed().subscribe(value =>{
      if(value === 'save') {
        this.getAllProducts();
      }
    });
  }

  openDialogEditProduct(element: any ) {
    this.dialog.open(ProductDialogComponent, {
      // width: '30%',
      data: element
    }).afterClosed().subscribe(value =>{
      if(value === 'update') {
        this.getAllProducts();
      }
    });
  }

}
