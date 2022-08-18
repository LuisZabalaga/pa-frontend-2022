import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { CategoriesService } from '../../../../services/categories.service';
import { ToastService } from 'angular-toastify';  
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  productForm !: FormGroup;
  listCategories: any;
  actionBtn: string = "Agregar";

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public editProduct: any,
    private dialogRef: MatDialogRef<ProductDialogComponent>) { }

  ngOnInit(): void {

    this.getAllCategories();

    const date: Date = new Date();
    console.log("Date = " + date);

    this.productForm = this.formBuilder.group({
      prod_ID: [''],
      prod_nombre: ['', Validators.required],
      prod_descripcion: ['', Validators.required],
      prod_peso_total: [{value: '0', disabled: true}],
      prod_peso_aqp: [{value: '0', disabled: true}],
      prod_peso_local: [{value: '0', disabled: true}],
      prod_imagen: [''],
      prod_cat_ID: ['', Validators.required],
      prod_created_at: date,
      prod_updated_at: date
    });

    if(this.editProduct) {
      // this.productForm.get('prod_peso_aqp').enable();
      // this.productForm.get('prod_peso_aqp').setValue('');
      // console.log(this.editProduct);
      this.actionBtn = "Actualizar";
      this.productForm.controls['prod_ID'].setValue(this.editProduct.prod_ID);
      this.productForm.controls['prod_nombre'].setValue(this.editProduct.prod_nombre);
      this.productForm.controls['prod_descripcion'].setValue(this.editProduct.prod_descripcion);

      this.productForm.get('prod_peso_total').enable();
      this.productForm.get('prod_peso_aqp').enable();
      this.productForm.get('prod_peso_local').enable();

      this.productForm.controls['prod_peso_total'].setValue(this.editProduct.prod_peso_total);
      this.productForm.controls['prod_peso_aqp'].setValue(this.editProduct.prod_peso_aqp);
      this.productForm.controls['prod_peso_local'].setValue(this.editProduct.prod_peso_local);
      this.productForm.controls['prod_imagen'].setValue(this.editProduct.prod_imagen);
      this.productForm.controls['prod_cat_ID'].setValue(this.editProduct.prod_cat_ID);
      // this.productForm.controls['cat_nombre'].setValue(this.editProduct.cat_nombre);
    }
    
  }

  getAllCategories() {
    this.categoriesService.getAllData().subscribe(res => {
      this.listCategories = res 
      console.log(res);
    });
  } 

  addProduct() {
    if (!this.editProduct) {
      if(this.productForm.valid) {
        this.productsService.createData(this.productForm.value)
        .subscribe({
          next: (res) => {
            this._toastService.success('Producto Agregado Satisfactoriamente!!!');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            // alert("Error")
            this._toastService.error('Error al Agregar Producto!!!');
          }
        })
      }
    } else {
      this.updateProduct()
    }
   
  }

  updateProduct() {
    if(this.productForm.valid) {
      this.productsService.updateData(this.productForm.value, this.editProduct.prov_ID)
      .subscribe({
        next: (res) => {
          this._toastService.success('Producto Modificado Satisfactoriamente!!!');
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          // alert("Error")
          this._toastService.error('Error al Modificar Producto!!!');
        }
      })
    }
  }

}
