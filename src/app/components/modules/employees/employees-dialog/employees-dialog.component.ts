import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { EmployeesService } from '../../../../services/employees.service';
import { RolesService } from '../../../../services/roles.service';
import { ToastService } from 'angular-toastify';  
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-employees-dialog',
  templateUrl: './employees-dialog.component.html',
  styleUrls: ['./employees-dialog.component.css']
})
export class EmployeesDialogComponent implements OnInit {

  EmployeeForm !: FormGroup;
  listRoles: any;
  actionBtn: string = "Agregar";

  constructor(
    private employeesService: EmployeesService,
    private rolesService: RolesService,
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public editEmployee: any,
    private dialogRef: MatDialogRef<EmployeesDialogComponent>) { }

  ngOnInit(): void {

    this.getAllRoles();

    const date: Date = new Date();
    console.log("Date = " + date);

    this.EmployeeForm = this.formBuilder.group({
      emp_ID: [''],
      emp_nombres: ['', Validators.required],
      emp_apellidos: ['', Validators.required],
      emp_dni: [''],
      emp_email: [''],
      emp_celular: [''],
      emp_direccion: [''],
      emp_ciudad: [''],
      emp_estado: ['', Validators.required],
      emp_ingreso: ['', Validators.required],
      emp_rol_ID: ['', Validators.required],
      emp_usuario: [''],
      emp_contraseña: [''],
      emp_created_at: moment(date).format("YYYY-MM-DDTHH:mm:ss.sss"),
      emp_updated_at: moment(date).format("YYYY-MM-DDTHH:mm:ss.sss")
    });

    if(this.editEmployee) {
      console.log(this.editEmployee);
      this.actionBtn = "Actualizar";
      this.EmployeeForm.controls['emp_ID'].setValue(this.editEmployee.emp_ID);
      this.EmployeeForm.controls['emp_nombres'].setValue(this.editEmployee.emp_nombres);
      this.EmployeeForm.controls['emp_apellidos'].setValue(this.editEmployee.emp_apellidos);
      this.EmployeeForm.controls['emp_dni'].setValue(this.editEmployee.emp_dni);
      this.EmployeeForm.controls['emp_email'].setValue(this.editEmployee.emp_email);
      this.EmployeeForm.controls['emp_celular'].setValue(this.editEmployee.emp_celular);
      this.EmployeeForm.controls['emp_direccion'].setValue(this.editEmployee.emp_direccion);
      this.EmployeeForm.controls['emp_ciudad'].setValue(this.editEmployee.emp_ciudad);
      this.EmployeeForm.controls['emp_estado'].setValue(this.editEmployee.emp_estado);
      this.EmployeeForm.controls['emp_ingreso'].setValue(this.editEmployee.emp_ingreso);
      this.EmployeeForm.controls['emp_rol_ID'].setValue(this.editEmployee.emp_rol_ID);
      this.EmployeeForm.controls['emp_usuario'].setValue(this.editEmployee.emp_usuario);
      this.EmployeeForm.controls['emp_contraseña'].setValue(this.editEmployee.emp_contraseña);
      // this.EmployeeForm.controls['cat_nombre'].setValue(this.editEmployee.cat_nombre);
    }
    
  }

  getAllRoles() {
    this.rolesService.getAllData().subscribe(res => {
      this.listRoles = res 
      console.log(res);
    });
  } 

  addEmployee() {
    if (!this.editEmployee) {
      if(this.EmployeeForm.valid) {
        this.employeesService.createData(this.EmployeeForm.value)
        .subscribe({
          next: (res) => {
            this._toastService.success('Empleado Agregado Satisfactoriamente!!!');
            this.EmployeeForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            // alert("Error")
            this._toastService.error('Error al Agregar Empleado!!!');
          }
        })
      }
    } else {
      this.updateEmployee()
    }
   
  }

  updateEmployee() {
    if(this.EmployeeForm.valid) {
      this.employeesService.updateData(this.EmployeeForm.value, this.editEmployee.prov_ID)
      .subscribe({
        next: (res) => {
          this._toastService.success('Empleado Modificado Satisfactoriamente!!!');
          this.EmployeeForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          // alert("Error")
          this._toastService.error('Error al Modificar Empleado!!!');
        }
      })
    }
  }

}
