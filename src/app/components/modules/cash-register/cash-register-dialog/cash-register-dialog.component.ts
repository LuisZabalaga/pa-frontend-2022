import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CashRegisterService } from '../../../../services/cash-register.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { CustomerService } from 'src/app/services/customer.service';
import { TypeExpenseService } from 'src/app/services/type-expense.service';
import { ToastService } from 'angular-toastify';  
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { analyzeAndValidateNgModules } from '@angular/compiler';


@Component({
  selector: 'app-cash-register-dialog',
  templateUrl: './cash-register-dialog.component.html',
  styleUrls: ['./cash-register-dialog.component.css']
})
export class CashRegisterDialogComponent implements OnInit {

  cashRegisterForm !: FormGroup;
  actionBtn: string = "Agregar";
  listEmployees: any;
  listCustomers: any;
  valueCustomerId: any;
  // listTypeExpenses: any;

  constructor(
    private cashRegisterService: CashRegisterService,
    private employeesService: EmployeesService,
    private customerService: CustomerService,
    private typeExpenseService: TypeExpenseService,
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public editCashRegister: any,
    private dialogRef: MatDialogRef<CashRegisterDialogComponent>) { }

  ngOnInit(): void {

    this.getAllEmployees();
    // this.getAllTypeExpenses();
    this.getAdvanceForCustomer();

    const date: Date = new Date();
    console.log("Date = " + date);

    this.cashRegisterForm = this.formBuilder.group({
      cas_ID: [''],
      cas_monto: ['', Validators.required],
      cas_fecha: ['', Validators.required],
      cas_estado: ['', Validators.required],
      cas_cus_ID: [{value: '', disabled: true}],
      // cas_cus_ID: [''],
      cas_concepto: ['', Validators.required],
      cas_emp_ID: ['', Validators.required],
      cas_created_at: date,
      cas_updated_at: date
    });

    // [{value: '', disabled: true}]

    if(this.editCashRegister) {
      // console.log(this.editCashRegister);
      this.actionBtn = "Actualizar";
      this.cashRegisterForm.controls['cas_ID'].setValue(this.editCashRegister.cas_ID);
      this.cashRegisterForm.controls['cas_monto'].setValue(this.editCashRegister.cas_monto);
      this.cashRegisterForm.controls['cas_fecha'].setValue(this.editCashRegister.cas_fecha);
      this.cashRegisterForm.controls['cas_estado'].setValue(this.editCashRegister.cas_estado);
      this.cashRegisterForm.controls['cas_concepto'].setValue(this.editCashRegister.cas_concepto);
      this.cashRegisterForm.controls['cas_emp_ID'].setValue(this.editCashRegister.cas_emp_ID);
     
    }
    
  }

  // getAllTypeExpenses() {
  //   this.typeExpenseService.getAllData().subscribe(res => {
  //     this.listTypeExpenses = res 
  //     console.log(res);
  //   });
  // }

  activateAdvanceCustomer(event: any) {
    let activateCustomer = event.value;
    if (activateCustomer==='0') {
      this.cashRegisterForm.get('cas_cus_ID').enable();
    } else {
      this.cashRegisterForm.get('cas_cus_ID').disable();
    }
    
  }

  getAllEmployees() {
    this.employeesService.getAllData().subscribe(res => {
      this.listEmployees = res;
      // console.log(res);
    });
  }

  getAdvanceForCustomer() {
    this.customerService.getAllData().subscribe(res => {
      this.listCustomers = res; 
      // console.log(res);
    });
  }

  addCashRegister() {
    if (!this.editCashRegister) {
      if(this.cashRegisterForm.valid) {
        this.cashRegisterService.createData(this.cashRegisterForm.value)
        .subscribe({
          next: (res) => {
            this._toastService.success('Deposito Agregado Satisfactoriamente!!!');
            this.cashRegisterForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            // alert("Error")
            this._toastService.error('Error al Agregar Gasto!!!');
          }
        })
      }
    } else {
      this.updateCashRegister()
    }
   
  }

  updateCashRegister() {
    if(this.cashRegisterForm.valid) {
      this.cashRegisterService.updateData(this.cashRegisterForm.value, this.editCashRegister.cas_ID)
      .subscribe({
        next: (res) => {
          this._toastService.success('Deposito Modificado Satisfactoriamente!!!');
          this.cashRegisterForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          // alert("Error")
          this._toastService.error('Error al Modificar Gasto!!!');
        }
      })
    }
  }

}
