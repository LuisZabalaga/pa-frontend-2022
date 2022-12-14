import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../../../services/products.service';
import { CategoriesService } from '../../../../services/categories.service';
import { ToastService } from 'angular-toastify';  
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  productForm !: FormGroup;
  listCategories: any;
  actionBtn: string = "Agregar";
  selectedEdit: any;

  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

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
    // console.log("Date = " + date);

    this.productForm = this.formBuilder.group({
      prod_ID: [''],
      prod_nombre: ['', Validators.required],
      prod_descripcion: [''],
      prod_peso_total: [{value: '0', disabled: true}],
      prod_peso_aqp: [{value: '0', disabled: true}],
      prod_peso_local: [{value: '0', disabled: true}],
      prod_imagen: [''],
      prod_cat_ID: ['', Validators.required],
      prod_created_at: moment(date).format("YYYY-MM-DDTHH:mm:ss.sss"),
      prod_updated_at: moment(date).format("YYYY-MM-DDTHH:mm:ss.sss")
    });

    if(this.editProduct) {

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
      this.selectedEdit = this.editProduct.prod_cat_ID;
    }
    
  }

  getAllCategories() {
    this.categoriesService.getAllData().subscribe(res => {
      this.listCategories = res 
    });
  } 

  addProduct() {
    if (!this.editProduct) {
      if(this.productForm.valid) {
        this.productsService.createData(this.productForm.value)
        .subscribe({
          next: (res) => {
            this._toastService.success('Material Agregado Satisfactoriamente!!!');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            // alert("Error")
            this._toastService.error('Error al Agregar Material!!!');
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
          this._toastService.success('Material Modificado Satisfactoriamente!!!');
          this.productForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          // alert("Error")
          this._toastService.error('Error al Modificar Material!!!');
        }
      })
    }
  }

}
