import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CustomerService } from '../../../../services/customer.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'angular-toastify';  
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  clientForm !: FormGroup;
  actionBtn: string = "Agregar";

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public editClient: any,
    private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {

    const date: Date = new Date();
    console.log("Date = " + date);

    this.clientForm = this.formBuilder.group({
      cus_ID: [''],
      cus_nombres: ['', Validators.required],
      cus_apellidos: ['', Validators.required],
      cus_dni: ['', Validators.required],
      cus_ruc: ['', Validators.required],
      cus_email: ['', Validators.required],
      cus_celular: ['', Validators.required],
      cus_direccion: ['', Validators.required],
      cus_ciudad: ['', Validators.required],
      cus_estado: ['', Validators.required],
      cus_created_at: date,
      cus_updated_at: date
    });

    if(this.editClient) {
      console.log(this.editClient);
      this.actionBtn = "Actualizar";
      this.clientForm.controls['cus_ID'].setValue(this.editClient.cus_ID);
      this.clientForm.controls['cus_nombres'].setValue(this.editClient.cus_nombres);
      this.clientForm.controls['cus_apellidos'].setValue(this.editClient.cus_apellidos);
      this.clientForm.controls['cus_dni'].setValue(this.editClient.cus_dni);
      this.clientForm.controls['cus_ruc'].setValue(this.editClient.cus_ruc);
      this.clientForm.controls['cus_email'].setValue(this.editClient.cus_email);
      this.clientForm.controls['cus_celular'].setValue(this.editClient.cus_celular);
      this.clientForm.controls['cus_direccion'].setValue(this.editClient.cus_direccion);
      this.clientForm.controls['cus_ciudad'].setValue(this.editClient.cus_ciudad);
      this.clientForm.controls['cus_estado'].setValue(this.editClient.cus_estado);
    }
    
  }

  addClient() {
    if (!this.editClient) {
      if(this.clientForm.valid) {
        this.customerService.createData(this.clientForm.value)
        .subscribe({
          next: (res) => {
            this._toastService.success('Cliente agregado satisfactoriamente!!!');
            this.clientForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            // alert("Error")
            this._toastService.error('Error al agregar Cliente!!!');
          }
        })
      }
    } else {
      this.updateCliente()
    }
   
  }

  updateCliente() {
    if(this.clientForm.valid) {
      this.customerService.updateData(this.clientForm.value, this.editClient.cus_ID)
      .subscribe({
        next: (res) => {
          this._toastService.warn('Cliente Modificado Satisfactoriamente!!!');
          this.clientForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          // alert("Error")
          this._toastService.error('Error al Modificar Cliente!!!');
        }
      })
    }
  }

  // this.customerService.createData(this.clientForm.value).subscribe((res) => {
  //   console.log(res, 'res==>');
  //   this.clientForm.reset();
  
  // })

  // console.log(this.userForm.value);
  //     this.apiService.createData(this.userForm.value).subscribe((res) => {
  //       console.log(res, 'res==>');
  //       this.userForm.reset();
  //     })
  //     this._toastService.success('Usuario añadido con exicto!!!');
  //   // } else {
  //     console.log("All field is required");


}

