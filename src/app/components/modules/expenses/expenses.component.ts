import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpensesService } from '../../../services/expenses.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'angular-toastify';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExpenseDialogComponent } from './expense-dialog/expense-dialog.component';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  listExpenses: any;

  displayedColumns: string[] = ['posicion', 'cantidad', 'tipo', 'descripcion', 'usuario', 'fecha', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private expensesService: ExpensesService,
    private _toastService: ToastService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.getAllExpenses();
    
  }

  getAllExpenses(){
    this.expensesService.getAllData().subscribe(res => {
    this.listExpenses = res;
    console.log("hello");
    console.log(res);
    this.dataSource = new MatTableDataSource(this.listExpenses);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  deleteOneExpense(id:any) {
    console.log(id, 'deleteid ==>');
    this.expensesService.deleteData(id).subscribe({
      next: (res) => {
        this._toastService.warn('Gasto Eliminado Satisfactoriamente!!!');
        this.getAllExpenses();
      },
      error: () => {
        this._toastService.error('Error!!! No se puede Eliminar Gasto!!');
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

  openDialogAddExpense() {
    this.dialog.open(ExpenseDialogComponent , {
      // width: '30%',
    }).afterClosed().subscribe(value =>{
      if(value === 'save') {
        this.getAllExpenses();
      }
    });
  }

  openDialogEditExpense(element: any ) {
    this.dialog.open(ExpenseDialogComponent, {
      // width: '30%',
      data: element
    }).afterClosed().subscribe(value =>{
      if(value === 'update') {
        this.getAllExpenses();
      }
    });
  }

}
