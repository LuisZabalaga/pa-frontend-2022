import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AdvancesService } from 'src/app/services/advances.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ToastService } from 'angular-toastify';  
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-advances-dialog',
  templateUrl: './advances-dialog.component.html',
  styleUrls: ['./advances-dialog.component.css']
})

export class AdvancesDialogComponent implements OnInit {

  advanceForm !: FormGroup;
  actionBtn: string = "Agregar";
  listProviders: any;
  listCustomers: any;
  activateState: any;

  listDataAdvance: any;

  cambioValor: any = false;

  constructor(
    private advancesService: AdvancesService,
    private providersService: ProvidersService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public editAdvance: any,
    private dialogRef: MatDialogRef<AdvancesDialogComponent>) { }

  ngOnInit(): void {

    const date: Date = new Date();
    // console.log("Date = " + date);

    this.getAllProviders();
    this.getAllCustomer();

    this.advanceForm = this.formBuilder.group({
      ad_ID: [''],
      ad_fecha: [moment(date).format("YYYY-MM-DDTHH:mm:ss.sss"), Validators.required],
      ad_cantidad: ['', Validators.required],
      ad_dest_adv: ['', Validators.required],
      ad_prov_cus_ID: ['', Validators.required],
      ad_estado: ['', Validators.required],
      ad_created_at: moment(date).format("YYYY-MM-DDTHH:mm:ss.sss"),
      ad_updated_at: moment(date).format("YYYY-MM-DDTHH:mm:ss.sss")
    });

    if(this.editAdvance) {
      // console.log(this.editAdvance);
      this.actionBtn = "Actualizar";

      this.activateState = this.editAdvance.ad_dest_adv;

      this.advanceForm.controls['ad_ID'].setValue(this.editAdvance.ad_ID);
      this.advanceForm.controls['ad_fecha'].setValue(this.editAdvance.ad_fecha);
      this.advanceForm.controls['ad_cantidad'].setValue(this.editAdvance.ad_cantidad);
      this.advanceForm.controls['ad_dest_adv'].setValue(this.editAdvance.ad_dest_adv);
      this.advanceForm.controls['ad_prov_cus_ID'].setValue(this.editAdvance.ad_prov_cus_ID);
      // console.log(this.editAdvance.ad_dest_adv);
      // console.log(this.editAdvance.ad_prov_cus_ID);
      this.cambioValor=true;
      this.advanceForm.controls['ad_estado'].setValue(this.editAdvance.ad_estado);
    }
  }

  getAllProviders() {
    this.providersService.getAllData().subscribe(res => {
      this.listProviders = res;
    });
  }

  getAllCustomer() {
    this.customerService.getAllData().subscribe(res => {
      this.listCustomers = res;
    });
  }  

  getProvidersOrCustomersForState(event: any) {
    console.log("Se ejecuto")
    this.activateState = event.value;
    if (this.activateState === 0) {
      this.listDataAdvance = this.listProviders.map(obj => {
        return {
            ad_ID: obj.prov_ID,
            ad_nombres: obj.prov_nombres,
            ad_apellidos: obj.prov_apellidos 
        }
      })
    } else {
      this.listDataAdvance = this.listCustomers.map(obj => {
        return {
            ad_ID: obj.cus_ID,
            ad_nombres: obj.cus_nombres,
            ad_apellidos: obj.cus_apellidos 
        }
      })
    }
  }

  addAdvance() {
    if (!this.editAdvance) {
      if(this.advanceForm.valid) {
        this.advancesService.createData(this.advanceForm.value)
        .subscribe({
          next: (res) => {
            this._toastService.success('Adelanto Agregado Satisfactoriamente!!!');
            this.advanceForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            // alert("Error")
            this._toastService.error('Error al Agregar Adelanto!!!');
          }
        })
      }
    } else {
      this.updateAdvance()
    }
   
  }

  updateAdvance() {
    if(this.advanceForm.valid) {
      this.advancesService.updateData(this.advanceForm.value, this.editAdvance.ad_ID)
      .subscribe({
        next: (res) => {
          this._toastService.success('Adelanto Modificado Satisfactoriamente!!!');
          this.advanceForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          // alert("Error")
          this._toastService.error('Error al Modificar Adelanto!!!');
        }
      })
    }
  }


}
