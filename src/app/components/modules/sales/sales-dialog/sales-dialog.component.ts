import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { SalesDetailService } from 'src/app/services/sales-detail.service';
import { SalesService } from 'src/app/services/sales.service';
import { ToastService } from 'angular-toastify';  
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sales-dialog',
  templateUrl: './sales-dialog.component.html',
  styleUrls: ['./sales-dialog.component.css']
})
export class SalesDialogComponent implements OnInit {

  listSalesDetail: any;
  listSales: any;
  total: any;
  adelanto: any;
  saldo: any;
  importe: any;
  displayAdelanto: boolean = true;

  constructor(
    private salesDetailService: SalesDetailService,
    private salesService: SalesService,
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public salesDetailData: any,
    private dialogRef: MatDialogRef<SalesDialogComponent>) { }

  ngOnInit(): void {

    this.getSalesDetailsForId();
    this.getSaleForId();
    this.changeVisibilityOfAdvancementAndBalance();

    const date: Date = new Date();
    
  }

  getSalesDetailsForId() {
    this.salesDetailService.getAllData(this.salesDetailData.sa_ID).subscribe(res => {
      this.listSalesDetail = res;      
    });
  }

  getSaleForId () {
    this.salesService.getSalesForId(this.salesDetailData.sa_ID).subscribe(res => {
      this.listSales = res;
      this.importe = this.listSales[0].sa_total_importe;
      this.adelanto = this.listSales[0].sa_adelanto;
      this.saldo = this.adelanto - this.importe;
      this.total = this.listSales[0].sa_total;
      console.log(this.importe, this.adelanto, this.saldo);
      this.changeVisibilityOfAdvancementAndBalance();
    });
  }

  closeDialogSales () {
    this.dialogRef.close();
  }

  changeVisibilityOfAdvancementAndBalance() {
    if (this.adelanto == 0){
      this.displayAdelanto = false;
    }
    
  } 

}
