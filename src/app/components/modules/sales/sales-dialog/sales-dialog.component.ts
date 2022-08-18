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

    const date: Date = new Date();
    console.log("Date = " + date);

    // console.log(this.salesDetailData);
    
  }

  getSalesDetailsForId() {
    this.salesDetailService.getAllData(this.salesDetailData.sa_ID).subscribe(res => {
      this.listSalesDetail = res;
      console.log(res);
    });
  }

  getSaleForId () {
    this.salesService.getSalesForId(this.salesDetailData.sa_ID).subscribe(res => {
      this.listSales = res;
      console.log(res);
    });
  }

  closeDialogSales () {
    this.dialogRef.close();
  }

}
