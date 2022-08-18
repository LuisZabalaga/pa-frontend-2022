import { Component, OnInit, ViewChild } from '@angular/core';
import { CashRegisterService } from '../../../services/cash-register.service';
import { ExpensesService } from '../../../services/expenses.service';
import { SalesService } from '../../../services/sales.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AdvancesService } from 'src/app/services/advances.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'angular-toastify';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CashRegisterDialogComponent } from './cash-register-dialog/cash-register-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrls: ['./cash-register.component.css']
})
export class CashRegisterComponent implements OnInit {

  date: Date = new Date()

  ranges = new FormGroup({
    start: new FormControl(this.date),
    end: new FormControl(this.date),
  });

  rangesIncomes = new FormGroup({
    start: new FormControl(this.date),
    end: new FormControl(this.date),
  });

  dates: any;
  totalCashRegister: any;
  totalAdvancesCustomers: any;
  totalExpensesForDate: any;
  totalAdvances: any;
  totalPurchasesForDate: any;
  totalSalesForDate: any;

  listCashRegister: any;
  listAdvancesCustomers: any;
  listExpenses: any;
  listAdvances: any;
  listPurchases: any;
  listSales: any;


  listMantenanceCashRegister: any;

  totalExpenses: any;
  totalSales: any;
  totalPurchases: any;
  incomes: any;
  expenses: any;

  incomesTotal: number;
  expensesTotal: number;
  expensesTotal2: number;
  purchasesTotal: number;
  salesTotal: number;


  displayedColumns: string[] = ['posicion', 'monto', 'fecha', 'concepto', 'estado', 'encargado', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private cashRegisterService: CashRegisterService,
    private expensesService: ExpensesService,
    private advancesService: AdvancesService,
    private salesService: SalesService,
    private purchasesService: PurchasesService,
    private _toastService: ToastService,
    private dialog: MatDialog
    
    ) { }

  ngOnInit(): void {

    this.getAllDataForDate();
    this.getAllCashRegisterMaintenanceForDate();
    
    // this.getAllCashRegisterForDate();
    // this.getAllExpensesForDate();
    // this.getAllAdvacesForDate();
    // this.getAllPurchasesForDate();




    // this.getAllCashRegisterIncomes();
    // this.getAllCashRegisterExpenses();

    this.getTotalExpenses();
    // this.getTotalPurchases();
    this.getTotalSales();
  }

  getAllCashRegisterForDate(i: any, f:any){
    this.cashRegisterService.getCashRegisterForDate(i, f).subscribe(res => {
    this.listCashRegister = res[0];
    console.log("hello");
    console.log(res);
    // this.dataSource = new MatTableDataSource(this.listCashRegister);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    this.totalCashRegister = this.listCashRegister.map(item => parseInt(item.cas_monto)).reduce(
      (prev, curr) => prev + curr, 0);

    });
  }

  getTotalAdvacesForCustomerAndDate(code: any, i: any, f:any){
    this.advancesService.getTotalAdvancesForCustomerAndDate(code, i, f).subscribe(res => {
    this.listAdvancesCustomers = res[0];
    console.log("hello");
    console.log(res);
    
    this.totalAdvancesCustomers = this.listAdvancesCustomers.map(item => parseInt(item.ad_total)).reduce(
      (prev, curr) => prev + curr, 0);
    });
  }

  getAllExpensesForDate(i: any, f:any){
    this.expensesService.getAllExpensesForDate(i, f).subscribe(res => {
    this.listExpenses = res[0];
    console.log("hello");
    console.log(res);
    
    this.totalExpensesForDate = this.listExpenses.map(item => parseInt(item.exp_cantidad)).reduce(
      (prev, curr) => prev + curr, 0);

    });
  }

  getAllAdvacesForDate(i: any, f:any){
    this.advancesService.getAdvancesForProvidersAndDate(i, f).subscribe(res => {
    this.listAdvances = res[0];
    console.log("hello");
    console.log(res);
    
    this.totalAdvances = this.listAdvances.map(item => parseInt(item.ad_cantidad)).reduce(
      (prev, curr) => prev + curr, 0);
    });
  }

  getAllPurchasesForDate(i: any, f: any) {
    this.purchasesService.getAllData(i, f).subscribe(res => {
      this.listPurchases = res;
      console.log("hello");
      console.log(res);

      this.totalPurchasesForDate = this.listPurchases.map(item => parseInt(item.pu_total)).reduce(
        (prev, curr) => prev + curr, 0);
    });
  }

  getAllSalesForDate(i: any, f: any) {
    this.salesService.getAllData(i, f).subscribe(res => {
      this.listSales = res;
      console.log("hello");
      console.log(res);

      this.totalSalesForDate = this.listSales.map(item => parseInt(item.sa_total)).reduce(
        (prev, curr) => prev + curr, 0);
    });
  }

  getAllDataForDate() {    
    this.dates = this.ranges.value;
    const dateStart = new Date(this.dates.start); // Replace event.value with your date value
    const dateEnd = new Date(this.dates.end);
    const forDateStart = moment(dateStart).format("YYYY-MM-DD");
    const forDateEnd = moment(dateEnd).format("YYYY-MM-DD");

    this.getAllPurchasesForDate(forDateStart, forDateEnd);
    this.getAllAdvacesForDate(forDateStart, forDateEnd);
    this.getAllCashRegisterForDate(forDateStart, forDateEnd);
    this.getAllExpensesForDate(forDateStart, forDateEnd);
    this.getAllSalesForDate(forDateStart, forDateEnd);
    this.getTotalAdvacesForCustomerAndDate(1, forDateStart, forDateEnd);
    

    // this.purchasesService.getAllData(forDateStart, forDateEnd).subscribe(res => {
    //   this.listPurchases = res;
    //   console.log("hello");
    //   console.log(res);
    //   this.dataSource = new MatTableDataSource(this.listPurchases);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
  }

  getAllCashRegisterMaintenanceForDate() {    
    this.dates = this.rangesIncomes.value;
    const dateStart = new Date(this.dates.start); // Replace event.value with your date value
    const dateEnd = new Date(this.dates.end);
    const forDateStart = moment(dateStart).format("YYYY-MM-DD");
    const forDateEnd = moment(dateEnd).format("YYYY-MM-DD");

    this.cashRegisterService.getCashRegisterForDate(forDateStart, forDateEnd).subscribe(res => {
      this.listMantenanceCashRegister = res[0];
      console.log("hello");
      console.log(res);
      this.dataSource = new MatTableDataSource(this.listMantenanceCashRegister);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }



  // getAllCashRegisterIncomes(){
  //   this.cashRegisterService.getAllDataIncomes().subscribe(res => {
  //     this.incomes = res[0].ingresos;
  //     this.incomesTotal = parseInt(this.incomes)
  //     console.log("Total Ingresos: "+this.incomesTotal);
  //   });
  // }

  // getAllCashRegisterExpenses(){
  //   this.cashRegisterService.getAllDataExpenses().subscribe(res => {
  //     this.expenses = res[0].egresos;
  //     this.expensesTotal = parseInt(this.expenses)
  //     console.log("Total Expenses: "+this.expensesTotal);
  //   });
  // }  

  

  deleteOneCashRegister(id:any) {
    console.log(id, 'deleteid ==>');
    this.cashRegisterService.deleteData(id).subscribe({
      next: (res) => {
        this._toastService.warn('Caja Eliminada Satisfactoriamente!!!');
        this.getAllCashRegisterMaintenanceForDate();
        // this.getAllCashRegisterIncomes();
        // this.getAllCashRegisterExpenses();
        this.getTotalExpenses();
        this.getTotalPurchases();
        this.getTotalSales();
      },
      error: () => {
        this._toastService.error('Error!!! No se puede Eliminar Caja!!!');
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

  openDialogAddCashRegister () {
    this.dialog.open(CashRegisterDialogComponent , {
      // width: '30%',
    }).afterClosed().subscribe(value =>{
      if(value === 'save') {
        this.getAllCashRegisterMaintenanceForDate();
        // this.getAllCashRegisterIncomes();
        // this.getAllCashRegisterExpenses();

        this.getTotalExpenses();
        this.getTotalPurchases();
        // this.getTotalSales();
      }
    });
  }

  openDialogEditCashRegister (element: any ) {
    this.dialog.open(CashRegisterDialogComponent, {
      // width: '30%',
      data: element
    }).afterClosed().subscribe(value =>{
      if(value === 'update') {
        this.getAllCashRegisterMaintenanceForDate();
        // this.getAllCashRegisterIncomes();
        // this.getAllCashRegisterExpenses();

        this.getTotalExpenses();
        this.getTotalPurchases();
        // this.getTotalSales();
      }
    });
  }

  getTotalExpenses() {
    this.expensesService.getAllData().subscribe(res => {
      this.totalExpenses = res;
      this.expensesTotal2 = this.totalExpenses.map(item =>  parseInt(item.exp_cantidad)).reduce((prev, curr) => prev + curr, 0);
      
      // console.log(this.totalExpenses);
      console.log("Total Gastos: "+this.expensesTotal2);
    });
  }

  getTotalPurchases() {
    this.purchasesService.getAllData('2022-01-01', '2022-08-31').subscribe(res => {
      this.totalPurchases = res;
      this.purchasesTotal = this.totalPurchases.map(item =>  parseInt(item.pu_total)).reduce((prev, curr) => prev + curr, 0);
      
      // console.log(this.totalPurchases);
      console.log("Total Compras: "+this.purchasesTotal);
    });
  }

  getTotalSales() {
    this.salesService.getAllData('2022-01-01', '2022-08-31').subscribe(res => {
      this.totalSales = res;
      this.salesTotal = this.totalSales.map(item =>  parseInt(item.sa_total)).reduce((prev, curr) => prev + curr, 0);
      
      // console.log(this.totalSales);
      console.log("Total Ventas: "+this.salesTotal);
    });
  }


}
