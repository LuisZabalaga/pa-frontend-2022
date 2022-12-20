import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'angular-toastify';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShoppingDialogComponent } from './shopping-dialog/shopping-dialog.component';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProvidersService } from 'src/app/services/providers.service';
import { ProductsService } from 'src/app/services/products.service';
import { TemporaryPurchaseDetailService } from 'src/app/services/temporary-purchase-detail.service';
import { PurchasesService } from 'src/app/services/purchases.service';
import { PurchaseDetailService } from 'src/app/services/purchase-detail.service';
import { AdvancesService } from 'src/app/services/advances.service';
import { AdvancesStateService } from 'src/app/services/advances-state.service';
import { TicketService } from 'src/app/services/ticket.service';
import { PurchaseIdService } from 'src/app/services/purchase-id.service';
import { CashRegisterService } from 'src/app/services/cash-register.service';
import * as moment from 'moment';
import 'moment/locale/pt-br';


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  advanceForm !: FormGroup;
  ticketForm !: FormGroup;

  purchase: any;
  listAvancesForProvider: any;
  providerId: any;
  amountProvider: any = 0;
  dateAdvance: any;
  totalFlete: any;
  fleteMonto: any = 0;

  stateProviderId: any;

  weightProductPurchase: any;

  date: Date = new Date()
  // date: Date = new Date().toUTCString();
  // date: new Date().toISOString();

  dates: any;

  totalCompras: number;
  actionBtn: string = "Agregar";
  temporaryPurchaseDetailForm !: FormGroup;
  listPurchasesForm!: FormGroup;

  cashRegisterForm !: FormGroup;

  listTemporaryPurchaseDetail: any;
  listTotalPurchaseDetail: any;
  listProviders: any;
  listProducts: any;
  totalPurchase: any;
  acumulado: number;
  totalAcumulado: number;
  listPurchases: any;
  listTotalWeightProductById: any;

  purchaseId: any;
  purchaseIdNumber: any;

  lastAdvanceId: any;

  displayedColumns: string[] = ['posicion', 'fecha_pu', 'boleta', 'proveedor', 'encargado', 'total', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  displayedColumns2: string[] = ['posicion', 'producto', 'peso', 'precio', 'subtotal', 'acciones'];
  dataSource2!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ranges = new FormGroup({
    start: new FormControl(this.date),
    end: new FormControl(this.date),
  });
  
  //GENERANDO BOLETA
  numberTicket: String;
  ticketData: any;
  lastTicketNumber: any;
  numLastTicket2: any;
  numLastTicket3: any;

  getLastPurchaseId () {
    this.purchaseIdService.getLastPurchaseId().subscribe({
      next: (res) => {
        this.purchaseId = res;

        if (this.purchaseId == null) {
          this.purchaseIdNumber = 1;
        } else {
          this.purchaseIdNumber = this.purchaseId.pu_ID+1;
        }

        this.temporaryPurchaseDetailForm = this.formBuilder.group({
          pur_ID: [''],
          pur_prod_ID: ['', Validators.required],
          pur_peso: ['', Validators.required],
          pur_precio: ['', Validators.required],
          pur_pu_ID: [this.purchaseIdNumber, Validators.required],
          pur_created_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
          pur_updated_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")
        });
        
      }
    })
  }

  getGenerateTicketNumber () {
    this.ticketService.getAllData().subscribe({
      next: (res) => {
        this.ticketData = res[0];
        this.lastTicketNumber = this.ticketData.tick_boleta;
        this.numLastTicket2 = this.ticketData.tick_numero;

        this.listPurchasesForm = this.formBuilder.group({
          pu_ID: '',
          pu_fecha: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
          pu_boleta: [this.lastTicketNumber, Validators.required],
          pu_prov_ID: ['', Validators.required],
          pu_emp_ID: [1, Validators.required],
          pu_total_importe: ['', Validators.required],
          pu_adelanto: ['', Validators.required],
          pu_flete: [{value: '', disabled: true}],
          // pu_total: [Validators.required],
          pu_created_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
          pu_updated_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")
        }); 

      },
      error: (e) => {
        console.log(e);
      }
    })
    
  }

  totalPurchaseDetail: any;

  constructor(
    private providersService: ProvidersService,
    private productsService: ProductsService,
    private purchasesService: PurchasesService,
    private temporaryPurchaseDetailService: TemporaryPurchaseDetailService,
    private purchaseDetailService: PurchaseDetailService,
    private advancesService: AdvancesService,
    private advancesStateService: AdvancesStateService,
    private ticketService: TicketService,
    private purchaseIdService: PurchaseIdService,
    private cashRegisterService: CashRegisterService,
    private _toastService: ToastService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.getLastPurchaseId ();
    this.getGenerateTicketNumber ();

    this.getAllTemporaryPurchaseDetail();
    this.getTotalPurchaseDetail();

    this.getAllPurchasesForDate();
    this.getAllProviders();
    this.getAllProducts();
    

    this.temporaryPurchaseDetailForm = this.formBuilder.group({
      pur_ID: [''],
      pur_prod_ID: ['', Validators.required],
      pur_peso: ['', Validators.required],
      pur_precio: ['', Validators.required],
      pur_pu_ID: [this.purchaseIdNumber, Validators.required],
      pur_created_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
      pur_updated_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")]
    });

    this.listPurchasesForm = this.formBuilder.group({
      pu_ID: '',
      pu_fecha: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
      pu_boleta: [this.lastTicketNumber, Validators.required],
      pu_prov_ID: ['', Validators.required],
      pu_emp_ID: [1, Validators.required],
      pu_total_importe: ['', Validators.required],
      pu_adelanto: ['', Validators.required],
      pu_flete: [{value: '', disabled: true}],
      // pu_total: [Validators.required],
      pu_created_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
      pu_updated_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")]
    });

    this.temporaryPurchaseDetailForm = this.formBuilder.group({
      pur_ID: [''],
      pur_prod_ID: ['', Validators.required],
      pur_peso: ['', Validators.required],
      pur_precio: ['', Validators.required],
      pur_pu_ID: [this.purchaseIdNumber, Validators.required],
      pur_created_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
      pur_updated_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")]
    });

    this.cashRegisterForm = this.formBuilder.group({
      cas_monto: [''],
      cas_fecha: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
      cas_pur_sal_ID: [''],
      cas_estado: ['1'],
      cas_concepto: [''],
      cas_emp_ID: ['',],
      cas_created_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
      cas_updated_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")]
    });

  }

  getAllTemporaryPurchaseDetail() {
    this.temporaryPurchaseDetailService.getAllData().subscribe(res => {
      this.listTemporaryPurchaseDetail = res;
      this.dataSource2 = new MatTableDataSource(this.listTemporaryPurchaseDetail);
    })
  }

  getTotalWeightForProductById (id: any) {
    this.productsService.getTotalWeightProductsById(id).subscribe(res => {
      this.listTotalWeightProductById = res;
      console.log(res);
    })
  }

  getTotalPurchaseDetail() {
    this.temporaryPurchaseDetailService.getTotalData().subscribe(res => {
      this.listTotalPurchaseDetail = res;
      this.totalPurchaseDetail = this.listTotalPurchaseDetail[0].pur_total;

      this.listPurchasesForm = this.formBuilder.group({
        pu_ID: '',
        pu_fecha: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
        pu_boleta: [this.lastTicketNumber, Validators.required],
        pu_prov_ID: ['', Validators.required],
        pu_emp_ID: [1, Validators.required],
        pu_total_importe: [this.totalPurchaseDetail, Validators.required],
        pu_adelanto: ['', Validators.required],
        pu_flete: [{value: '', disabled: true}],
        // pu_total: [this.totalPurchaseDetail, Validators.required],
        pu_created_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
        pu_updated_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")]
      });

    })
  }

  getAdvanceForProvider() {
    this.providerId = this.listPurchasesForm.value;
    this.stateProviderId = this.providerId.pu_prov_ID;
    this.advancesService.getAdvanceForProvider(this.providerId.pu_prov_ID).subscribe(res => {
      this.listAvancesForProvider = res[0];
      if (this.listAvancesForProvider?.length) {
        this.amountProvider = this.listAvancesForProvider[0].ad_cantidad;
        this.dateAdvance = this.listAvancesForProvider[0].ad_fecha;
      } else {
        this.amountProvider = 0;
        this.dateAdvance = 0;
      }

      this.listPurchasesForm.get('pu_adelanto').setValue(this.amountProvider);

    })
  }

  isChecked:boolean = false;

  activateShippingFreight(e){
    if (this.isChecked =! this.isChecked) {
      this.listPurchasesForm.get('pu_flete').enable();
      this.listPurchasesForm.get('pu_flete').setValue('');
      this.fleteMonto = 0;
    } else {
      this.listPurchasesForm.get('pu_flete').setValue('');
      this.listPurchasesForm.get('pu_flete').disable();
      this.fleteMonto = 0;
    }
    
  }

  addTotalFreight() {
    this.totalFlete = this.listPurchasesForm.value;
    this.fleteMonto = this.totalFlete.pu_flete;

  }

  addWeightPurchase(){
    this.weightProductPurchase = this.temporaryPurchaseDetailForm.value;
    this.temporaryPurchaseDetailService.addWeightPurchase(this.weightProductPurchase.pur_peso, this.weightProductPurchase.pur_prod_ID)
    .subscribe({
      next: (res) => {
       
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  addTemporaryPurchaseDetail() {
    if (this.temporaryPurchaseDetailForm.valid) {
      this.temporaryPurchaseDetailService.createData(this.temporaryPurchaseDetailForm.value)
        .subscribe({
          next: (res) => {

            this.getTotalPurchaseDetail();
            this.getAllTemporaryPurchaseDetail();
            this.addWeightPurchase();
            this.getTotalWeightForProductById(this.temporaryPurchaseDetailForm.value.pur_prod_ID);
            
            this.temporaryPurchaseDetailForm = this.formBuilder.group({
              pur_ID: [''],
              pur_prod_ID: ['', Validators.required],
              pur_pu_ID: [this.purchaseIdNumber, Validators.required],
              pur_peso: ['', Validators.required],
              pur_precio: ['', Validators.required],              
              pur_created_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
              pur_updated_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")]
            });

            this.listPurchasesForm.get('pu_flete').setValue(0);

          },
          error: (e) => {
            console.log(e);
          }
        })
    }
  }

  diminishWeightPurchase(peso: any, producto: any){
    this.temporaryPurchaseDetailService.diminishWeightPurchase(peso, producto)
    .subscribe({
      next: (res) => {

      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  deleteOneTemporaryPurchaseDetail(id: any, peso: any, producto: any) {
    this.temporaryPurchaseDetailService.deleteData(id).subscribe({
      next: (res) => {
        this.getAllTemporaryPurchaseDetail();
        this.getTotalPurchaseDetail();
        this.diminishWeightPurchase(peso, producto);
      },
      error: (e) => {
        console.log(e);
      }

    });
  }

  getAllProviders() {
    this.providersService.getAllData().subscribe(res => {
      this.listProviders = res;
    })
  }

  getAllProducts() {
    this.productsService.getAllData().subscribe(res => {
      this.listProducts = res;
    })
  }

  getAllPurchasesForDate() {    
    this.dates = this.ranges.value;
    const dateStart = new Date(this.dates.start); // Replace event.value with your date value
    const dateEnd = new Date(this.dates.end);
    const forDateStart = moment(dateStart).format("YYYY-MM-DD");
    const forDateEnd = moment(dateEnd).format("YYYY-MM-DD");

    this.purchasesService.getAllData(forDateStart, forDateEnd).subscribe(res => {
      this.listPurchases = res;
      this.dataSource = new MatTableDataSource(this.listPurchases);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteAllTemporaryPurchasesDetail () {
    this.purchaseDetailService.deleteData().subscribe({
      next: (res) => {
        this.getAllTemporaryPurchaseDetail();
        this.getTotalPurchaseDetail();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  addPurchasesDetail () {
    // console.log("DATOS TABLA", this.dataSource2.filteredData);
    this.purchaseDetailService.createData(this.dataSource2.filteredData)
    .subscribe({
      next: (res) => {
        this.deleteAllTemporaryPurchasesDetail();
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  changeStateOFAdvanceProvider () {
    if (this.fleteMonto === undefined) {
      this.fleteMonto = 0;
    }
    let montoCobrar = this.totalPurchaseDetail-this.fleteMonto-this.amountProvider;
    // console.log("OTROS CALCULOS ", this.totalPurchaseDetail, this.fleteMonto, this.amountProvider);
    // console.log("TOTAL ", montoCobrar);
    
    if (montoCobrar < this.amountProvider) {

      this.advancesService.getAdvanceForProvider(this.stateProviderId).subscribe(res => {
        this.listAvancesForProvider = res[0];

        if (this.listAvancesForProvider?.length) {

           //Cambia el estado del Adelanto del Proveedor
           this.advancesStateService.changeStateForAdvanceToProvider(this.stateProviderId)
           .subscribe({
                   next: (res) => {
                     console.log("Estado de Proveedor Modificado__ ", this.stateProviderId);

                     if (montoCobrar < 0) {
                      let montoAdelanto = montoCobrar*(-1);
                      this.advanceForm = this.formBuilder.group({
                        ad_ID: [''],
                        ad_fecha: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"), Validators.required],
                        ad_cantidad: [montoAdelanto, Validators.required],
                        ad_dest_adv: [0, Validators.required],
                        ad_prov_cus_ID: [this.stateProviderId, Validators.required],
                        ad_estado: [0, Validators.required],
                        ad_created_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
                        ad_updated_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")]
                      });
            
                      // console.log("Ingreso monto negativo");
            
                      this.advancesService.createData(this.advanceForm.value)
                          .subscribe({
                            next: (res) => {
                              this._toastService.info('Nuevo Adelanto Agregado');
                              // console.log(this.advanceForm.value);
                              
                              //Agregando Adelanto Sobrante a Caja
                              this.advancesStateService.getLastAdvanceId()
                                .subscribe({
                                  next: (res) => {
                                    this.lastAdvanceId = res[0].ad_ID;

                                    this.cashRegisterForm = this.formBuilder.group({
                                      cas_monto: [montoAdelanto],
                                      cas_fecha: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
                                      cas_pur_sal_ID: [this.lastAdvanceId],
                                      cas_des: ["AP"],
                                      cas_estado: ['0'],
                                      cas_concepto: ['Adelanto Proveedor'],
                                      cas_emp_ID: ['1'],
                                      cas_created_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
                                      cas_updated_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")]
                                    });
                        
                                    this.cashRegisterService.createData(this.cashRegisterForm.value)
                                    .subscribe({
                                      next: (res) => {
                                        console.log("Adelanto Proveedor Agregado a Caja");
                                        this.cashRegisterForm.reset();
                                      },
                                      error: (e) => {
                                        console.log("Error", e)
                                      }
                                    })

                                  }
                                })                     

                              this.advanceForm.reset();

                            },
                            error: (e) => {
                              console.log(e)
                            }
                      });
                    }     

                   },
                   error: (e) => {
                     console.log(e);
                   }
             })
             
          // console.log("Si hay adelanto ",this.listAvancesForProvider);

        }

      });

      //VALORES NEGATIVOS ESTAN INGRESANDO AQUI
    } else {

      this.advancesService.getAdvanceForProvider(this.stateProviderId).subscribe(res => {
        this.listAvancesForProvider = res[0];

        if (this.listAvancesForProvider?.length) {
          // console.log(this.listAvancesForProvider);

          //Cambia el estado del Adelanto del Proveedor
          this.advancesStateService.changeStateForAdvanceToProvider(this.stateProviderId)
          .subscribe({
                  next: (res) => {
                    console.log("Estado de Proveedor Modificado Parte__ ", this.stateProviderId);
                  },
                  error: (e) => {
                    console.log(e);
                  }
            })

        } else {
          // console.log("No hay adelanto ",this.listAvancesForProvider);
        }
  
      })

    }

  }

  addPurchases () {
    
    if (this.listPurchasesForm.valid) {
      this.purchasesService.createData(this.listPurchasesForm.value)
        .subscribe({
          next: (res) => {
            
            this._toastService.success('Compra Agregada Satisfactoriamente!!!');
            
            this.addPurchasesDetail();
            this.getAllTemporaryPurchaseDetail();
            this.getTotalPurchaseDetail();
            this.getAllPurchasesForDate();
            // this.deleteAllTemporaryPurchasesDetail();
            this.getAdvanceForProvider();
            this.changeStateOFAdvanceProvider();

            //Agregando Compra a Caja
            let purchaseTotal;
            if (this.amountProvider === undefined) {
              if (this.fleteMonto === undefined) {
                purchaseTotal = this.totalPurchaseDetail;
              } else {
                purchaseTotal = this.totalPurchaseDetail-this.fleteMonto;
              }
            } else {
              if (this.fleteMonto === undefined) {
                purchaseTotal = this.totalPurchaseDetail-this.amountProvider;
              } else {
                purchaseTotal = this.totalPurchaseDetail-this.fleteMonto-this.amountProvider;
              }
            }

            if (purchaseTotal < 0) {
              purchaseTotal = 0;              
            }

            this.cashRegisterForm = this.formBuilder.group({
              cas_monto: [purchaseTotal],
              cas_fecha: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
              cas_pur_sal_ID: [this.purchaseIdNumber],
              cas_des: ["CP"],
              cas_estado: ['0'],
              cas_concepto: ['Compra Material'],
              cas_emp_ID: ['1'],
              cas_created_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
              cas_updated_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")]
            });

            this.cashRegisterService.createData(this.cashRegisterForm.value)
            .subscribe({
              next: (res) => {
                console.log("Compra Agregada a Caja");
                this.cashRegisterForm.reset();
              },
              error: (e) => {
                console.log("Error", e)
              }
            })

            this.temporaryPurchaseDetailForm = this.formBuilder.group({
              pur_ID: [''],
              pur_prod_ID: ['', Validators.required],
              pur_peso: ['', Validators.required],
              pur_precio: ['', Validators.required],
              pur_pu_ID: [this.purchaseIdNumber, Validators.required],
              pur_created_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
              pur_updated_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")]
            });

            this.listPurchasesForm.reset();

            let boleta = [];

            this.numLastTicket3 = this.numLastTicket2+1;

            for (let i=1; i<=this.numLastTicket3; i++) {
              let numBoleta = boleta[i-1] = i;
              if (numBoleta<10) {
                //6 digitos 000001
                this.numberTicket = `00000${numBoleta}`;
              }
              if (numBoleta>=10 && numBoleta<100) {
                this.numberTicket = `0000${numBoleta}`;
              }
              if (numBoleta>=100 && numBoleta<1000) {
                this.numberTicket = `000${numBoleta}`;
              }
              if (numBoleta>=1000 && numBoleta<10000) {
                this.numberTicket = `00${numBoleta}`;
              }
              if (numBoleta>=10000 && numBoleta<100000) {
                this.numberTicket = `0${numBoleta}`;
              }
              if (numBoleta>=100000 && numBoleta<100001) {
                this.numberTicket = `${numBoleta}`;
              }

            }

            this.ticketForm = this.formBuilder.group({
              tick_ID: [''],
              tick_ruc: [10471206170, Validators.required],
              tick_serie: ['00', Validators.required],
              tick_serie_numero: [1, Validators.required],
              tick_numero: [this.numLastTicket3, Validators.required],
              tick_boleta: [this.numberTicket, Validators.required],
              tick_boleta_final: [100000]
            });

            this.ticketService.createData(this.ticketForm.value).subscribe({
              next: (res) => {
                // console.log("Boleta Agregada");
                this.getLastPurchaseId();
                this.getGenerateTicketNumber();
              },
              error: (e) => {
                console.log("Error", e)
              }
            })

            // Reseteando las sumas de totales
            this.fleteMonto = 0;            
            this.ticketForm.reset();

          },
          error: (e) => {
            this._toastService.error('Error al Agregar Compra!!!');
          }
        })
    }
    // this.deleteAllTemporaryPurchasesDetail();

  }

  deleteOnePurchase(id: any) {
    // console.log(id, 'deleteid ==>');
    this.purchasesService.deleteData(id).subscribe({
      next: (res) => {
        this._toastService.warn('Compra Eliminada Satisfactoriamente!!!');
        this.getAllPurchasesForDate();
      },
      error: () => {
        this._toastService.error('Error!!! No se puede Eliminar Compra!!!');
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

  openDialogViewPurchaseDetail(element: any) {
    this.dialog.open(ShoppingDialogComponent, {
      // width: '30%',
      data: element
    }).afterClosed().subscribe(value => {
      if (value === 'update') {
        this.getAllPurchasesForDate();
      }
    });
  }

}
