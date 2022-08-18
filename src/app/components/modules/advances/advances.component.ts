import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'angular-toastify';
import { AdvancesService } from 'src/app/services/advances.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { AdvancesDialogComponent } from './advances-dialog/advances-dialog.component';
import { AdvancesCustomersDialogComponent } from './advances-customers-dialog/advances-customers-dialog.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-advances',
  templateUrl: './advances.component.html',
  styleUrls: ['./advances.component.css']
})
export class AdvancesComponent implements OnInit {

  // moment.locale("es");
  
  datee = moment();
  // let dateInFormat = datee.format('YYYY-MM-DD');
  // console.log(dateInFormat);
        
  
  date: Date = new Date();

  dates: any;

  inicial: any;
  final: any;

  range = new FormGroup({
    start: new FormControl(this.date),
    end: new FormControl(this.date),
  });

  rangeCustomers = new FormGroup({
    start: new FormControl(this.date),
    end: new FormControl(this.date),
  });

  listAdvancesProviders: any;
  listAdvancesCustomers: any;
  listAdvancesCustomersBalance: any

  displayedColumns: string[] = ['posicion', 'fecha', 'cantidad', 'proveedor', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  displayedColumnsCustomers: string[] = ['posicion', 'fecha', 'cantidad', 'clientes', 'estado', 'acciones'];
  dataSourceCustomers!: MatTableDataSource<any>;

  displayedColumnsCustomersBalance: string[] = ['posicion', 'fecha', 'cantidad', 'clientes', 'estado', 'acciones'];
  dataSourceCustomersBalance!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private advancesService: AdvancesService,
    private _toastService: ToastService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    
    this.getAllAdvancesForProviderAndDate();
    this.getAllTotalAdvancesForCustomerAndDate();
    this.getAllTotalAdvancesForCustomerAndDateAndBalance();
    
  }

  getAllAdvancesForProviderAndDate(){
    this.dates = this.range.value;
    const dateStart = new Date(this.dates.start); //Replace event.value with your date value
    const dateEnd = new Date(this.dates.end);
    const forDateStart = moment(dateStart).format("YYYY-MM-DD");
    const forDateEnd = moment(dateEnd).format("YYYY-MM-DD");

    this.advancesService.getAdvancesForProvidersAndDate(forDateStart, forDateEnd).subscribe(res => {
    this.listAdvancesProviders = res[0];
    console.log(res);
    this.dataSource = new MatTableDataSource(this.listAdvancesProviders);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
  }

  getAllTotalAdvancesForCustomerAndDate(){
    this.dates = this.rangeCustomers.value;
    const dateStart = new Date(this.dates.start); //Replace event.value with your date value
    const dateEnd = new Date(this.dates.end);
    const forDateStart = moment(dateStart).format("YYYY-MM-DD");
    const forDateEnd = moment(dateEnd).format("YYYY-MM-DD");

    this.inicial = forDateStart;
    this.final = forDateEnd;
    this.advancesService.getTotalAdvancesForCustomerAndDateAndState(1, 0,forDateStart, forDateEnd).subscribe(res => {
    this.listAdvancesCustomers = res[0];
    console.log(res);
    this.dataSourceCustomers = new MatTableDataSource(this.listAdvancesCustomers);
    this.dataSourceCustomers.paginator = this.paginator;
    this.dataSourceCustomers.sort = this.sort;
    });
  }

  getAllTotalAdvancesForCustomerAndDateAndBalance(){
    this.dates = this.rangeCustomers.value;
    const dateStart = new Date(this.dates.start); //Replace event.value with your date value
    const dateEnd = new Date(this.dates.end);
    const forDateStart = moment(dateStart).format("YYYY-MM-DD");
    const forDateEnd = moment(dateEnd).format("YYYY-MM-DD");

    this.inicial = forDateStart;
    this.final = forDateEnd;
    this.advancesService.getTotalAdvancesForCustomerAndDateAndState(1, 1, forDateStart, forDateEnd).subscribe(res => {
    this.listAdvancesCustomersBalance = res[0];
    console.log(res);
    this.dataSourceCustomersBalance = new MatTableDataSource(this.listAdvancesCustomersBalance);
    this.dataSourceCustomersBalance.paginator = this.paginator;
    this.dataSourceCustomersBalance.sort = this.sort;
    });
  }

  deleteOneAdvance(id:any) {
    console.log(id, 'deleteid ==>');
    this.advancesService.deleteData(id).subscribe({
      next: (res) => {
        this._toastService.warn('Adelanto Eliminado Satisfactoriamente!!!');
        this.getAllAdvancesForProviderAndDate();
        this.getAllTotalAdvancesForCustomerAndDate();
      },
      error: () => {
        this._toastService.error('Error!!! No se puede Eliminar Adelanto!!');
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

  openDialogAddAdvance() {
    this.dialog.open(AdvancesDialogComponent , {
      // width: '30%',
    }).afterClosed().subscribe(value =>{
      if(value === 'save') {
        this.getAllAdvancesForProviderAndDate();
        this.getAllTotalAdvancesForCustomerAndDate();
      }
    });
  }

  openDialogEditAdvance(element: any ) {
    this.dialog.open(AdvancesDialogComponent, {
      // width: '30%',
      data: element
    }).afterClosed().subscribe(value =>{
      if(value === 'update') {
        this.getAllAdvancesForProviderAndDate();
        this.getAllTotalAdvancesForCustomerAndDate();
      }
    });
  }

  openDialogAdvanceForIdCustomers(element:any ) {
    this.dialog.open(AdvancesCustomersDialogComponent, {
      // width: '30%',
      data: {element, inicial: this.inicial, final: this.final}
    }).afterClosed().subscribe(value =>{

      this.getAllAdvancesForProviderAndDate();
      this.getAllTotalAdvancesForCustomerAndDate();

      // if(value === 'update') {
      //   this.getAllAdvancesForProviderAndDate();
      //   this.getAllTotalAdvancesForCustomerAndDate();
      // }
    });
  }

}
