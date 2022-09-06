import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ProvidersService } from '../../../../services/providers.service';
import { ToastService } from 'angular-toastify';  
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-provider-dialog',
  templateUrl: './provider-dialog.component.html',
  styleUrls: ['./provider-dialog.component.css']
})
export class ProviderDialogComponent implements OnInit {

  providerForm !: FormGroup;
  actionBtn: string = "Agregar";

  constructor(
    private providersService: ProvidersService,
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public editProvider: any,
    private dialogRef: MatDialogRef<ProviderDialogComponent>) { }

  ngOnInit(): void {

    const date: Date = new Date();
    console.log("Date = " + date);

    this.providerForm = this.formBuilder.group({
      prov_ID: [''],
      prov_nombres: ['', Validators.required],
      prov_apellidos: ['', Validators.required],
      prov_razon_social: [''],
      prov_ruc: [''],
      prov_email: [''],
      prov_celular: [''],
      prov_direccion: [''],
      prov_ciudad: ['', Validators.required],
      prov_estado: ['', Validators.required],
      prov_created_at: moment(date).format("YYYY-MM-DDTHH:mm:ss.sss"),
      prov_updated_at: moment(date).format("YYYY-MM-DDTHH:mm:ss.sss")
    });

    if(this.editProvider) {
      console.log(this.editProvider);
      this.actionBtn = "Actualizar";
      this.providerForm.controls['prov_ID'].setValue(this.editProvider.prov_ID);
      this.providerForm.controls['prov_nombres'].setValue(this.editProvider.prov_nombres);
      this.providerForm.controls['prov_apellidos'].setValue(this.editProvider.prov_apellidos);
      this.providerForm.controls['prov_razon_social'].setValue(this.editProvider.prov_razon_social);
      this.providerForm.controls['prov_ruc'].setValue(this.editProvider.prov_ruc);
      this.providerForm.controls['prov_email'].setValue(this.editProvider.prov_email);
      this.providerForm.controls['prov_celular'].setValue(this.editProvider.prov_celular);
      this.providerForm.controls['prov_direccion'].setValue(this.editProvider.prov_direccion);
      this.providerForm.controls['prov_ciudad'].setValue(this.editProvider.prov_ciudad);
      this.providerForm.controls['prov_estado'].setValue(this.editProvider.prov_estado);
    }
    
  }

  addProvider() {
    if (!this.editProvider) {
      if(this.providerForm.valid) {
        this.providersService.createData(this.providerForm.value)
        .subscribe({
          next: (res) => {
            this._toastService.success('Proveedor Agregado Satisfactoriamente!!!');
            this.providerForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            // alert("Error")
            this._toastService.error('Error al Agregar Proveedor!!!');
          }
        })
      }
    } else {
      this.updateProvider()
    }
   
  }

  updateProvider() {
    if(this.providerForm.valid) {
      this.providersService.updateData(this.providerForm.value, this.editProvider.prov_ID)
      .subscribe({
        next: (res) => {
          this._toastService.warn('Proveedor Modificado Satisfactoriamente!!!');
          this.providerForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          // alert("Error")
          this._toastService.error('Error al Modificar Proveedor!!!');
        }
      })
    }
  }

}
