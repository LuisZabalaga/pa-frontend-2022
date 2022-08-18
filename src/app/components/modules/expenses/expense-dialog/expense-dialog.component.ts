import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ExpensesService } from '../../../../services/expenses.service';
import { EmployeesService } from 'src/app/services/employees.service';
import { TypeExpenseService } from 'src/app/services/type-expense.service';
import { ToastService } from 'angular-toastify';  
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-expense-dialog',
  templateUrl: './expense-dialog.component.html',
  styleUrls: ['./expense-dialog.component.css']
})
export class ExpenseDialogComponent implements OnInit {

  expenseForm !: FormGroup;
  actionBtn: string = "Agregar";
  listEmployees: any;
  listTypeExpenses: any;

  constructor(
    private expensesService: ExpensesService,
    private employeesService: EmployeesService,
    private typeExpenseService: TypeExpenseService,
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public editExpense: any,
    private dialogRef: MatDialogRef<ExpenseDialogComponent>) { }

  ngOnInit(): void {

    this.getAllEmployees();
    this.getAllTypeExpenses();

    const date: Date = new Date();
    console.log("Date = " + date);

    this.expenseForm = this.formBuilder.group({
      exp_ID: [''],
      exp_cantidad: ['', Validators.required],
      exp_typ_ID: ['', Validators.required],
      exp_descripcion: ['', Validators.required],
      exp_beneficiado: ['', Validators.required],
      exp_emp_ID: ['', Validators.required],
      exp_fecha: ['', Validators.required],
      exp_created_at: date,
      exp_updated_at: date
    });

    if(this.editExpense) {
      console.log(this.editExpense);
      this.actionBtn = "Actualizar";
      this.expenseForm.controls['exp_ID'].setValue(this.editExpense.exp_ID);
      this.expenseForm.controls['exp_cantidad'].setValue(this.editExpense.exp_cantidad);
      this.expenseForm.controls['exp_typ_ID'].setValue(this.editExpense.exp_typ_ID);
      this.expenseForm.controls['exp_descripcion'].setValue(this.editExpense.exp_descripcion);
      this.expenseForm.controls['exp_beneficiado'].setValue(this.editExpense.exp_beneficiado);
      this.expenseForm.controls['exp_emp_ID'].setValue(this.editExpense.exp_emp_ID);
      this.expenseForm.controls['exp_fecha'].setValue(this.editExpense.exp_fecha);
     
    }
    
  }

  getAllTypeExpenses() {
    this.typeExpenseService.getAllData().subscribe(res => {
      this.listTypeExpenses = res 
      console.log(res);
    });
  } 

  getAllEmployees() {
    this.employeesService.getAllData().subscribe(res => {
      this.listEmployees = res 
      console.log(res);
    });
  } 

  addExpense() {
    if (!this.editExpense) {
      if(this.expenseForm.valid) {
        this.expensesService.createData(this.expenseForm.value)
        .subscribe({
          next: (res) => {
            this._toastService.success('Gasto Agregado Satisfactoriamente!!!');
            this.expenseForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            // alert("Error")
            this._toastService.error('Error al Agregar Gasto!!!');
          }
        })
      }
    } else {
      this.updateExpense()
    }
   
  }

  updateExpense() {
    if(this.expenseForm.valid) {
      this.expensesService.updateData(this.expenseForm.value, this.editExpense.exp_ID)
      .subscribe({
        next: (res) => {
          this._toastService.success('Gasto Modificado Satisfactoriamente!!!');
          this.expenseForm.reset();
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
