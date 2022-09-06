import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CategoriesService } from '../../../../services/categories.service';
import { ToastService } from 'angular-toastify';  
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-categorie-dialog',
  templateUrl: './categorie-dialog.component.html',
  styleUrls: ['./categorie-dialog.component.css']
})
export class CategorieDialogComponent implements OnInit {

  categorieForm !: FormGroup;
  actionBtn: string = "Agregar";

  constructor(
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public editCategorie: any,
    private dialogRef: MatDialogRef<CategorieDialogComponent>) { }

  ngOnInit(): void {

    const date: Date = new Date();
    console.log("Date = " + date);

    this.categorieForm = this.formBuilder.group({
      cat_ID: [''],
      cat_nombre: ['', Validators.required],
      cat_descripcion: [''],
      cat_created_at: moment(date).format("YYYY-MM-DDTHH:mm:ss.sss"),
      cat_updated_at: moment(date).format("YYYY-MM-DDTHH:mm:ss.sss")
    });

    if(this.editCategorie) {
      console.log(this.editCategorie);
      this.actionBtn = "Actualizar";
      this.categorieForm.controls['cat_ID'].setValue(this.editCategorie.cat_ID);
      this.categorieForm.controls['cat_nombre'].setValue(this.editCategorie.cat_nombre);
      this.categorieForm.controls['cat_descripcion'].setValue(this.editCategorie.cat_descripcion);

    }
    
  }

  addCategorie() {
    if (!this.editCategorie) {
      if(this.categorieForm.valid) {
        this.categoriesService.createData(this.categorieForm.value)
        .subscribe({
          next: (res) => {
            this._toastService.success('Categoria Agregado Satisfactoriamente!!!');
            this.categorieForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            // alert("Error")
            this._toastService.error('Error al Agregar Categoria!!!');
          }
        })
      }
    } else {
      this.updateCategorie()
    }
   
  }

  updateCategorie() {
    if(this.categorieForm.valid) {
      this.categoriesService.updateData(this.categorieForm.value, this.editCategorie.cat_ID)
      .subscribe({
        next: (res) => {
          this._toastService.warn('Categoria Modificado Satisfactoriamente!!!');
          this.categorieForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          // alert("Error")
          this._toastService.error('Error al Modificar Categoria!!!');
        }
      })
    }
  }

}
