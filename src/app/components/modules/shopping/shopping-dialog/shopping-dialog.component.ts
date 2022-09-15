import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PurchaseDetailService } from 'src/app/services/purchase-detail.service';
import { PurchasesService } from 'src/app/services/purchases.service';
import { PrintingService } from 'src/app/services/printing.service';
import { ToastService } from 'angular-toastify';  
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as printJS from 'print-js';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shopping-dialog',
  templateUrl: './shopping-dialog.component.html',
  styleUrls: ['./shopping-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShoppingDialogComponent implements OnInit {

  // @ViewChild('printEl') printEl: ElementRef;

  listPurchaseDetail: any;
  listPurchase: any;
  dataJSON: JSON;
  estado: any;
  // actionBtn: string = "Agregar";

  monto: any;
  adelanto: any;
  flete: any;
  valorResultante: any;

  displayElement: boolean = true;
  displayElementAdelanto: boolean = true;

  // isFlete: boolean = true;
  // isSaldo: boolean; 

  constructor(
    private _toastService: ToastService,
    private purchaseDetailService: PurchaseDetailService,
    private purchaseService: PurchasesService,
    private printingService: PrintingService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public purchaseDetailData: any,
    private dialogRef: MatDialogRef<ShoppingDialogComponent>) { }

  ngOnInit(): void {

    this.getPurchaseDetailsForId();
    this.getPurchaseForId();
    this.changeVisibilityOfFreightAndBalance();

    const date: Date = new Date();

  }

  getPurchaseDetailsForId() {
    this.purchaseDetailService.getAllData(this.purchaseDetailData.pu_ID).subscribe(res => {
      this.listPurchaseDetail = res;
      console.log(this.listPurchaseDetail);
    });
  }

  getPurchaseForId () {
    this.purchaseService.getPurchaseForId(this.purchaseDetailData.pu_ID).subscribe(res => {
      this.listPurchase = res;
      // this.dataJSON = res;
      console.log(this.listPurchase);
      this.monto = this.listPurchase[0].pu_total;
      this.adelanto = this.listPurchase[0].pu_adelanto;
      this.flete = this.listPurchase[0].pu_flete;
      console.log(this.monto, this.adelanto, this.flete);

      this.changeVisibilityOfFreightAndBalance()
    });
  }

  closeDialogShopping () {
    this.dialogRef.close();
  }

  changeVisibilityOfFreightAndBalance() {
    if (this.flete == 0){
      this.displayElement = false;
    }

    if (this.adelanto == 0){
      this.displayElementAdelanto = false;
    }
    
  }

  printPurchase() {
    printJS({printable: this.listPurchaseDetail, properties: ['prod_ID', 'prod_nombre', 'purc_ID', 'purc_peso', 'purc_precio', 'purc_prod_ID', 'purc_pu_ID', 'purc_subtotal'], type: 'json' }); 
  }

  printPurchase2() {
    printJS("test", "html")
  }


}
