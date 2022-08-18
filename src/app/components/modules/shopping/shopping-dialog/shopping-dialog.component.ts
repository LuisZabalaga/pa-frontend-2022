import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PurchaseDetailService } from 'src/app/services/purchase-detail.service';
import { PurchasesService } from 'src/app/services/purchases.service';
import { PrintingService } from 'src/app/services/printing.service';
import { ToastService } from 'angular-toastify';  
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-shopping-dialog',
  templateUrl: './shopping-dialog.component.html',
  styleUrls: ['./shopping-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShoppingDialogComponent implements OnInit {

  // @ViewChild('printEl') printEl: ElementRef;

  // productForm !: FormGroup;
  listPurchaseDetail: any;
  listPurchase: any;
  estado: any;
  // actionBtn: string = "Agregar";

  monto: any;
  adelanto: any;
  flete: any;
  valorResultante: any;

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
    this.changevisibilityOfFreightAndBalance();

    const date: Date = new Date();
    console.log("Date = " + date);

    // if (this.monto === 0) {
    //   this.isSaldo = true;
    // }
    // if (this.flete =! 0) {
    //   this.isFlete = false;
    // } 

    // this.productForm = this.formBuilder.group({
    //   prod_ID: [''],
    //   prod_nombre: ['', Validators.required],
    //   prod_descripcion: ['', Validators.required],
    //   prod_precio_compra: ['', Validators.required],
    //   prod_precio_venta: ['', Validators.required],
    //   prod_peso_bruto: ['', Validators.required],
    //   prod_peso_puro: ['', Validators.required],
    //   prod_imagen: [''],
    //   prod_cat_ID: ['', Validators.required],
    //   prod_created_at: date,
    //   prod_updated_at: date
    // });

    // if(this.editProduct) {
    //   console.log(this.editProduct);
    //   this.actionBtn = "Actualizar";
    //   this.productForm.controls['prod_ID'].setValue(this.editProduct.prod_ID);
    //   this.productForm.controls['prod_nombre'].setValue(this.editProduct.prod_nombre);
    //   this.productForm.controls['prod_descripcion'].setValue(this.editProduct.prod_descripcion);
    //   this.productForm.controls['prod_precio_compra'].setValue(this.editProduct.prod_precio_compra);
    //   this.productForm.controls['prod_precio_venta'].setValue(this.editProduct.prod_precio_venta);
    //   this.productForm.controls['prod_peso_bruto'].setValue(this.editProduct.prod_peso_bruto);
    //   this.productForm.controls['prod_peso_puro'].setValue(this.editProduct.prod_peso_puro);
    //   this.productForm.controls['prod_imagen'].setValue(this.editProduct.prod_imagen);
    //   this.productForm.controls['prod_cat_ID'].setValue(this.editProduct.prod_cat_ID);
    //   // this.productForm.controls['cat_nombre'].setValue(this.editProduct.cat_nombre);
    // }

    // console.log(this.purchaseDetailData);

  }

  getPurchaseDetailsForId() {
    this.purchaseDetailService.getAllData(this.purchaseDetailData.pu_ID).subscribe(res => {
      this.listPurchaseDetail = res;
      // console.log(this.listPurchaseDetail);
    });
  }

  getPurchaseForId () {
    this.purchaseService.getPurchaseForId(this.purchaseDetailData.pu_ID).subscribe(res => {
      this.listPurchase = res;
      // console.log("compra: ",this.listPurchase);
      this.monto = this.listPurchase[0].pu_total;
      this.adelanto = this.listPurchase[0].pu_adelanto;
      this.flete = this.listPurchase[0].pu_flete;
      console.log(this.monto, this.adelanto, this.flete);
    });
  }

  closeDialogShopping () {
    this.dialogRef.close();
  }

  changevisibilityOfFreightAndBalance() {

    
  } 

  // public print(): void { 
  //   this.printingService.print(this.printEl.nativeElement); 
  // }

  // addProduct() {
  //   if (!this.editProduct) {
  //     if(this.productForm.valid) {
  //       this.productsService.createData(this.productForm.value)
  //       .subscribe({
  //         next: (res) => {
  //           this._toastService.success('Producto Agregado Satisfactoriamente!!!');
  //           this.productForm.reset();
  //           this.dialogRef.close('save');
  //         },
  //         error: () => {
  //           // alert("Error")
  //           this._toastService.error('Error al Agregar Producto!!!');
  //         }
  //       })
  //     }
  //   } else {
  //     this.updateProduct()
  //   }
   
  // }

  // updateProduct() {
  //   if(this.productForm.valid) {
  //     this.productsService.updateData(this.productForm.value, this.editProduct.prov_ID)
  //     .subscribe({
  //       next: (res) => {
  //         this._toastService.success('Producto Modificado Satisfactoriamente!!!');
  //         this.productForm.reset();
  //         this.dialogRef.close('update');
  //       },
  //       error: () => {
  //         // alert("Error")
  //         this._toastService.error('Error al Modificar Producto!!!');
  //       }
  //     })
  //   }
  // }

}
