import { Component, OnInit, resolveForwardRef, ViewChild, ViewChildren } from '@angular/core';
import { CashRegisterService } from '../../../services/cash-register.service';
import { ExpensesService } from '../../../services/expenses.service';
import { SalesService } from '../../../services/sales.service';
import { PurchasesService } from '../../../services/purchases.service';
import { AdvancesService } from 'src/app/services/advances.service';
import { CashRegisterBalanceService } from 'src/app/services/cash-register-balance.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'angular-toastify';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CashRegisterDialogComponent } from './cash-register-dialog/cash-register-dialog.component';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import moment from 'moment';
// import 'moment/locale/pt-br';


@Component({
  selector: 'app-cash-register',
  templateUrl: './cash-register.component.html',
  styleUrls: ['./cash-register.component.css']
})
export class CashRegisterComponent implements OnInit {

  cashRegisterForm !: FormGroup;
  // date: Date = new Date()
  date = moment();

  ranges = new FormGroup({
    start: new FormControl(this.date),
    end: new FormControl(this.date),
  });

  rangesIncomes = new FormGroup({
    start: new FormControl(this.date),
    end: new FormControl(this.date),
  });

  rangesCashRegister = new FormGroup({
    started: new FormControl(this.date),
    ended: new FormControl(this.date),
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

  currentIncomes: any;
  currentExpenses: any;
  currentDifference: any;
  currentJump: any;

  expensesTotal2: number;
  purchasesTotal: number;
  salesTotal: number;

  currentDate: any;

  listCashRegisterBalance: any;
  lastCashRegister: any;

  balanceLocalStorage: any;


  displayedColumnsCashRegisterMovements: string[] = ['posicion', 'monto', 'fecha', 'concepto', 'estado', 'encargado'];
  dataSourceCashRegisterMovements!: MatTableDataSource<any>;

  @ViewChild('paginatorMovements') paginatorMovements!: MatPaginator;
  @ViewChild('sortMovements') sortMovements!: MatSort;

  displayedColumnsCashRegisterHistory: string[] = ['posicion', 'fecha', 'ingresos', 'gastos', 'diferencia', 'saldo_anterior', 'encargado'];
  dataSourceCashRegisterHistory!: MatTableDataSource<any>;

  @ViewChild('paginatorHistory') paginatorHistory!:MatPaginator;
  @ViewChild('sortHistory', { read: MatSort, static: true }) sortHistory!:MatSort;

  // ngAfterViewInit() {
  //   this.dataSourceCashRegisterHistory.sort = this.sortHistory;
  // }

  constructor(
    private cashRegisterService: CashRegisterService,
    private expensesService: ExpensesService,
    private advancesService: AdvancesService,
    private salesService: SalesService,
    private purchasesService: PurchasesService,
    private cashRegisterBalanceService: CashRegisterBalanceService,
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    private dialog: MatDialog

  ) { }

  ngOnInit(): void {

    this.getAllDataForDate();
    this.getAllCashRegisterMaintenanceForDate();
    this.getTotalCashRegisterForState();
    this.getAllCashRegisterBalanceByDate();
    this.getBalanceCashRegisterOfLocalStorage();

    this.cashRegisterForm = this.formBuilder.group({
      bal_ID: [''],
      bal_fecha: [this.date.format("YYYY-MM-DD")],
      bal_incomes: ['', Validators.required],
      bal_expenses: ['', Validators.required],
      bal_balance: ['', Validators.required],
      bal_previous_balance: ['', Validators.required],
      bal_emp_ID: ['1', Validators.required],
    });

  }

  getBalanceCashRegisterOfLocalStorage () {
    this.cashRegisterBalanceService.getLastCashRegisterBalance().subscribe(res => {
      this.lastCashRegister = res[0];

      if (this.lastCashRegister.bal_estado === 1) {
        this.balanceLocalStorage = this.lastCashRegister.bal_previous_balance;
      } else {
        this.balanceLocalStorage = 0;
      }
      this.getTotalCashRegisterForState();
    });

  }

  getAllCashRegisterForDate(i:any, f:any){
    this.cashRegisterService.getCashRegisterForDate(i, f).subscribe(res => {
    this.listCashRegister = res[0];
    // console.log(res[0]);
    // this.dataSource = new MatTableDataSource(this.listCashRegister);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    this.totalCashRegister = this.listCashRegister.map(item => parseInt(item.cas_monto)).reduce(
      (prev, curr) => prev + curr, 0);
    });
  }

  // getAllCashRegisterBalanceByDate (i: any, f:any) {
  //   this.cashRegisterBalanceService.getAllCashRegisterBalanceByDate(i, f).subscribe(res => {
  //     this.listCashRegisterBalance = res;
  //   });
  // }

  getAllCashRegisterBalanceByDate() {
    let currentDate = this.rangesCashRegister.value;
    // currentDate = this.rangesIncomes.value;
    let dateStarted = new Date(currentDate.started); // Replace event.value with your date value
    let dateEnded = new Date(currentDate.ended);
    let forDateStart = moment(dateStarted).format("YYYY-MM-DD");
    let forDateEnd = moment(dateEnded).format("YYYY-MM-DD");

    this.cashRegisterBalanceService.getAllCashRegisterBalanceByDate(forDateStart, forDateEnd).subscribe(res => {
      this.listCashRegisterBalance = res[0];

      this.dataSourceCashRegisterHistory = new MatTableDataSource(this.listCashRegisterBalance);
      this.dataSourceCashRegisterHistory.paginator = this.paginatorHistory;
      this.dataSourceCashRegisterHistory.sort = this.sortHistory;
      console.log("SORT_2",this.dataSourceCashRegisterHistory);
      console.log("SORT",this.sortHistory);
    });
  }

  changeStateCashRegisterBalance (id:any, state:any) {
    this.cashRegisterBalanceService.changeStateCashRegisterBalance(id, state, 'data').subscribe(res => {
      console.log("Change Cash Register");
    });
  }

  getLastCashRegisterBalance () {
    this.cashRegisterBalanceService.getLastCashRegisterBalance().subscribe(res => {
      this.lastCashRegister = res[0];
      this.changeStateCashRegisterBalance(this.lastCashRegister.bal_ID, '1');
      // console.log(this.lastCashRegister);
      // window.localStorage.setItem("saldoCaja", this.lastCashRegister.bal_previous_balance);
      // this.balanceLocalStorage = window.localStorage.getItem("saldoCaja");
      this.balanceLocalStorage = this.lastCashRegister.bal_previous_balance;
      // this.getBalanceCashRegisterOfLocalStorage();

      this.getTotalCashRegisterForState();
    });
  }

  addDataToCashRegiterBalance () {
    // console.log(this.cashRegisterForm.value);
    this.cashRegisterBalanceService.getLastCashRegisterBalance().subscribe(res => {
      this.lastCashRegister = res[0];
      this.changeStateCashRegisterBalance(this.lastCashRegister.bal_ID, '0');
      this.getTotalCashRegisterForState();
    });
    this.cashRegisterBalanceService.addNewCashRegisterBalance(this.cashRegisterForm.value).subscribe(res => {
      console.log("DATA AGREGADA CASH")
      this.getAllCashRegisterBalanceByDate();
      // window.localStorage.removeItem("saldoCaja");
      this.getBalanceCashRegisterOfLocalStorage();
    });
  }

  getTotalAdvacesForCustomerAndDate(code: any, i: any, f:any){
    this.advancesService.getTotalAdvancesForCustomerAndDate(code, i, f).subscribe(res => {
    this.listAdvancesCustomers = res[0];

    this.totalAdvancesCustomers = this.listAdvancesCustomers.map(item => parseInt(item.ad_total)).reduce(
      (prev, curr) => prev + curr, 0);
    });
  }

  getAllExpensesForDate(i: any, f:any){
    this.expensesService.getAllExpensesForDate(i, f).subscribe(res => {
    this.listExpenses = res[0];

    this.totalExpensesForDate = this.listExpenses.map(item => parseInt(item.exp_cantidad)).reduce(
      (prev, curr) => prev + curr, 0);

    });
  }

  getAllAdvacesForDate(i: any, f:any){
    this.advancesService.getAdvancesForProvidersAndDate(i, f).subscribe(res => {
    this.listAdvances = res[0];

    this.totalAdvances = this.listAdvances.map(item => parseInt(item.ad_cantidad)).reduce(
      (prev, curr) => prev + curr, 0);
    });
  }

  getAllPurchasesForDate(i: any, f: any) {
    this.purchasesService.getAllData(i, f).subscribe(res => {
      this.listPurchases = res;

      this.totalPurchasesForDate = this.listPurchases.map(item => parseInt(item.pu_total)).reduce(
        (prev, curr) => prev + curr, 0);
    });
  }

  getAllSalesForDate(i: any, f: any) {
    this.salesService.getAllData(i, f).subscribe(res => {
      this.listSales = res;

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
      console.log(this.listMantenanceCashRegister);
      this.dataSourceCashRegisterMovements = new MatTableDataSource(this.listMantenanceCashRegister);
      this.dataSourceCashRegisterMovements.paginator = this.paginatorMovements;
      this.dataSourceCashRegisterMovements.sort = this.sortMovements;
    });
  }

  getTotalCashRegisterForState() {
    const currentDate = moment(this.date).format("YYYY-MM-DD");
    // console.log(currentDate);
    this.cashRegisterService.getTotalCashRegisterForState(1, currentDate, 'CA').subscribe(res => {
      let incomes = res;
      this.currentIncomes = incomes[0].cas_total;
      if (this.currentIncomes === null) {
        this.currentIncomes = 0;
      }

      this.cashRegisterForm = this.formBuilder.group({
        bal_ID: [''],
        bal_fecha: [this.date.format("YYYY-MM-DD")],
        bal_incomes: [parseInt(this.currentIncomes), Validators.required],
        bal_expenses: [parseInt(this.currentExpenses), Validators.required],
        bal_balance: ['', Validators.required],
        bal_previous_balance: [parseInt(this.balanceLocalStorage), Validators.required],
        bal_emp_ID: ['1', Validators.required],
      });

      if (this.currentExpenses === undefined) {
        this.currentExpenses = 0;
      }

      // console.log(this.currentIncomes, this.currentExpenses);
      this.currentDifference = this.currentIncomes - this.currentExpenses;
      // console.log(this.currentDifference, parseInt(this.balanceLocalStorage));
      this.currentJump = parseInt(this.balanceLocalStorage) - parseInt(this.currentExpenses) + parseInt(this.currentIncomes);
      // console.log(this.currentJump)
      // this.getCalculeDifferenceByDay();
    });
    this.cashRegisterService.getTotalCashRegisterForState(0, currentDate, 'CA').subscribe(res => {
      let expenses = res;
      this.currentExpenses = expenses[0].cas_total;
      if (this.currentExpenses === null) {
        this.currentExpenses = 0;
      }
      this.cashRegisterForm = this.formBuilder.group({
        bal_ID: [''],
        bal_fecha: [this.date.format("YYYY-MM-DD")],
        bal_incomes: [parseInt(this.currentIncomes), Validators.required],
        bal_expenses: [parseInt(this.currentExpenses), Validators.required],
        bal_balance: ['', Validators.required],
        bal_previous_balance: [parseInt(this.balanceLocalStorage), Validators.required],
        bal_emp_ID: ['1', Validators.required],
      });
      if (this.currentIncomes === undefined) {
        this.currentIncomes = 0;
      }
      this.currentDifference = this.currentIncomes - this.currentExpenses;
      // console.log(this.currentIncomes, this.currentExpenses);
      // console.log(this.currentDifference, parseInt(this.balanceLocalStorage));
      this.currentJump = parseInt(this.balanceLocalStorage) - parseInt(this.currentExpenses) + parseInt(this.currentIncomes);
      // this.getCalculeDifferenceByDay();
    });
    // this.currentDifference = this.currentIncomes - this.currentExpenses;
  }

  applyFilterMovements(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCashRegisterMovements.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceCashRegisterMovements.paginator) {
      this.dataSourceCashRegisterMovements.paginator.firstPage();
    }
  }

  applyFilterHistory(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceCashRegisterHistory.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceCashRegisterHistory.paginator) {
      this.dataSourceCashRegisterHistory.paginator.firstPage();
    }
  }

}
