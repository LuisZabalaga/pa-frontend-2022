import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastService } from 'angular-toastify';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductsService } from 'src/app/services/products.service';
import { TemporarySalesDetailService } from 'src/app/services/temporary-sales-detail.service';
import { SalesService } from 'src/app/services/sales.service';
import { SalesDetailService } from 'src/app/services/sales-detail.service';
import { AdvancesService } from 'src/app/services/advances.service';
import { AdvancesCustomerService } from 'src/app/services/advances-customer.service';
import { AdvancesStateService } from 'src/app/services/advances-state.service';
import { TicketSaleService } from 'src/app/services/ticket-sale.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SalesDialogComponent } from './sales-dialog/sales-dialog.component';
import { SaleIdService } from 'src/app/services/sale-id.service';
import { CashRegisterService } from 'src/app/services/cash-register.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import * as moment from 'moment';
import 'moment/locale/pt-br';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  advanceForm !: FormGroup;
  ticketSaleForm !: FormGroup;
  cashRegisterForm !: FormGroup;

  date: Date = new Date();
  dates: any;
  ranges = new FormGroup({
    start: new FormControl(this.date),
    end: new FormControl(this.date),
  });

  getTotalSales: any;
  customerId: any;
  dateAdvance: any;
  listAvancesForCustomer: any;
  amountCustomer: any = 0;

  weightProductSales: any;

  stateCustomerId: any;


  sales: any;

  totalVentas: number;
  actionBtn: string = "Agregar";
  temporarySalesDetailForm !: FormGroup;
  listSalesForm!: FormGroup;

  listTemporarySalesDetail: any;
  listTotalSalesDetail: any;
  listCustomers: any;
  listProducts: any;
  totalSales: any;
  acumulado: number;
  totalAcumulado: number;
  listSales: any;


  displayedColumns: string[] = ['posicion', 'fecha_sa', 'boleta', 'cliente', 'encargado', 'total', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  displayedColumns2: string[] = ['posicion', 'producto', 'peso', 'precio', 'subtotal', 'acciones'];
  dataSource2!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //GENERANDO BOLETA
  saleId: any;
  saleIdNumber: any;

  numberTicket: String;
  ticketData: any;
  lastTicketNumber: any;
  numLastTicket2: any;
  numLastTicket3: any;

  getLastSaleId () {
    this.saleIdService.getLastSaleId().subscribe({
      next: (res) => {
        this.saleId = res;

        if (this.saleId == null) {
          this.saleIdNumber = 1;
        } else {
          this.saleIdNumber = this.saleId.sa_ID+1;
        }

        this.temporarySalesDetailForm = this.formBuilder.group({
          sal_ID: [''],
          sal_prod_ID: ['', Validators.required],
          sal_sa_ID: [this.saleIdNumber, Validators.required],
          sal_peso: ['', Validators.required],
          sal_precio: ['', Validators.required],
          sal_created_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
          sal_updated_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
        });
        
      }
    })
  }

  getGenerateTicketNumber () {
    this.ticketSaleService.getAllData().subscribe({
      next: (res) => {
        this.ticketData = res[0];
        this.lastTicketNumber = this.ticketData.tick_sal_boleta;
        this.numLastTicket2 = this.ticketData.tick_sal_numero;

        console.log(this.ticketData)

        this.listSalesForm = this.formBuilder.group({
          sa_ID: '',
          sa_fecha: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
          sa_boleta: [this.lastTicketNumber, Validators.required],
          sa_cus_ID: ['', Validators.required],
          sa_emp_ID: ['1', Validators.required],
          sa_total_importe: ['', Validators.required],
          sa_adelanto: ['', Validators.required],
          sa_created_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
          sa_updated_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
        });

      },
      error: (e) => {
        console.log(e);
      }
    })
    
  }

  constructor(
    private customerService: CustomerService,
    private productsService: ProductsService,
    private salesService: SalesService,
    private temporarySalesDetailService: TemporarySalesDetailService,
    private salesDetailService: SalesDetailService,
    private advancesService: AdvancesService,
    private advancesCustomerService: AdvancesCustomerService,
    private advancesStateService: AdvancesStateService,
    private ticketSaleService: TicketSaleService,
    private saleIdService: SaleIdService,
    private cashRegisterService: CashRegisterService,
    private _toastService: ToastService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.getLastSaleId();
    this.getGenerateTicketNumber();

    this.getAllTemporarySalesDetail();
    this.getTotalSalesDetail();

    this.getAllSalesForDate();
    this.getAllCustomers();
    this.getAllProducts();    

    this.temporarySalesDetailForm = this.formBuilder.group({
      sal_ID: [''],
      sal_prod_ID: ['', Validators.required],
      sal_sa_ID: [this.saleIdNumber, Validators.required],
      sal_peso: ['', Validators.required],
      sal_precio: ['', Validators.required],
      sal_created_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
      sal_updated_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
    });

    this.listSalesForm = this.formBuilder.group({
      sa_ID: '',
      sa_fecha: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
      sa_boleta: [this.lastTicketNumber, Validators.required],
      sa_cus_ID: ['', Validators.required],
      sa_emp_ID: ['1', Validators.required],
      sa_total_importe: ['', Validators.required],
      sa_adelanto: ['', Validators.required],
      sa_created_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
      sa_updated_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
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

  getAllTemporarySalesDetail() {
    this.temporarySalesDetailService.getAllData().subscribe(res => {
      this.listTemporarySalesDetail = res;
      console.log(this.listTemporarySalesDetail);
      this.dataSource2 = new MatTableDataSource(this.listTemporarySalesDetail);

    })
  }

  getTotalSalesDetail() {
    this.temporarySalesDetailService.getTotalData().subscribe(res => {
      this.listTotalSalesDetail = res;
      
      this.getTotalSales = this.listTotalSalesDetail[0].sal_total;
      console.log(this.getTotalSales);

      this.listSalesForm = this.formBuilder.group({
        sa_ID: '',
        sa_fecha: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
        sa_boleta: [this.lastTicketNumber, Validators.required],
        sa_cus_ID: ['', Validators.required],
        sa_emp_ID: ['1', Validators.required],
        sa_total_importe: [this.getTotalSales, Validators.required],
        sa_adelanto: ['', Validators.required],
        sa_created_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
        sa_updated_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
      });

    })

  }

  getAdvanceForCustomer() {
    this.customerId = this.listSalesForm.value;
    this.stateCustomerId = this.customerId.sa_cus_ID;
    this.advancesCustomerService.getAdvanceForCustomerAndState(this.customerId.sa_cus_ID).subscribe(res => {
      this.listAvancesForCustomer = res[0];
      if (this.listAvancesForCustomer?.length) {
        this.amountCustomer = this.listAvancesForCustomer[0].ad_total;
        this.dateAdvance = this.listAvancesForCustomer[0].ad_final_fecha;

        if (this.amountCustomer === null) {
          if (this.amountCustomer === undefined) {
            this.amountCustomer = 0;
            this.dateAdvance = 0
          }
          this.amountCustomer = 0;
          this.dateAdvance = 0
        }
      } else {
        this.amountCustomer = 0;
        this.dateAdvance = 0;
      }

      this.listSalesForm.get('sa_adelanto').setValue(this.amountCustomer);

    })
  }


  addWeightSale(){
    this.weightProductSales = this.temporarySalesDetailForm.value;
    this.temporarySalesDetailService.addWeightSale(this.weightProductSales.sal_peso, this.weightProductSales.sal_prod_ID)
    .subscribe({
      next: (res) => {

      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  addTemporarySalesDetail() {
    if (this.temporarySalesDetailForm.valid) {
      this.temporarySalesDetailService.createData(this.temporarySalesDetailForm.value)
        .subscribe({
          next: (res) => {
            // this._toastService.success('Deposito Agregado Satisfactoriamente!!!');
            this.getTotalSalesDetail();
            this.getAllTemporarySalesDetail();
            this.addWeightSale();

            this.temporarySalesDetailForm = this.formBuilder.group({
              sal_ID: [''],
              sal_prod_ID: ['', Validators.required],
              sal_sa_ID: [this.saleIdNumber, Validators.required],
              sal_peso: ['', Validators.required],
              sal_precio: ['', Validators.required],
              sal_created_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
              sal_updated_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
            });

          },
          error: (e) => {
            console.log(e);
          }
        })
    }
  }

  diminishWeightSale(peso: any, producto: any){
    this.temporarySalesDetailService.diminishWeightSale(peso, producto)
    .subscribe({
      next: (res) => {

      },
      error: (e) => {
        console.log(e);
      }
    })

  }

  deleteOneTemporarySaleDetail(id: any, peso: any, producto: any) {
    this.temporarySalesDetailService.deleteData(id).subscribe({
      next: (res) => {
        this.getAllTemporarySalesDetail();
        this.getTotalSalesDetail();
        this.diminishWeightSale(peso, producto);
      },
      error: (e) => {
        console.log(e);
      }

    });
  }

  getAllCustomers() {
    this.customerService.getAllData().subscribe(res => {
      this.listCustomers = res;
    })
  }

  getAllProducts() {
    this.productsService.getAllData().subscribe(res => {
      this.listProducts = res;
    })
  }

  getAllSalesForDate() {
    this.dates = this.ranges.value;
    const dateStart = new Date(this.dates.start); // Replace event.value with your date value
    const dateEnd = new Date(this.dates.end);
    const forDateStart = moment(dateStart).format("YYYY-MM-DD");
    const forDateEnd = moment(dateEnd).format("YYYY-MM-DD");

    this.salesService.getAllData(forDateStart, forDateEnd).subscribe(res => {
      this.listSales = res;
      this.dataSource = new MatTableDataSource(this.listSales);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteAllTemporarySalesDetail () {
    this.salesDetailService.deleteData().subscribe({
      next: (res) => {
        this.getAllTemporarySalesDetail();
        this.getTotalSalesDetail();
      },
      error: (e) => {
        console.log(e);
      }
    });
  }

  addSalesDetail () {
    this.salesDetailService.createData(this.dataSource2.filteredData)
    .subscribe({
      next: (res) => {
        this.deleteAllTemporarySalesDetail();
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  changeStateOFAdvanceCustomer () {
    let montoCobrar = this.getTotalSales-this.amountCustomer;
    console.log("OTROS CALCULOS ", this.getTotalSales, this.amountCustomer);
    console.log("TOTAL ", montoCobrar);

    //LOS VALORES NEGATIVOS INGRESAN AQUI
    if (montoCobrar < this.amountCustomer) {

      this.advancesCustomerService.getAdvanceForCustomerAndState(this.stateCustomerId).subscribe(res => {
        this.listAvancesForCustomer = res[0];
        console.log("Cantidad de adelanto", this.listAvancesForCustomer);
      })

      if (this.listAvancesForCustomer?.length) {
          //Cambia el estado del Adelanto del Proveedor
          this.advancesStateService.changeStateForAdvanceToCustomer(1, this.stateCustomerId)
          .subscribe({
                  next: (res) => {
                    console.log("Estado de Cliente Modificado__ ", this.stateCustomerId);
                  },
                  error: (e) => {
                    console.log(e);
                  }
            })
        console.log("Si hay adelanto ",this.listAvancesForCustomer);

      }

      if (montoCobrar < 0) {  //Agregando Monto restante negativo
        let montoAdelanto = montoCobrar*(-1);
        this.advanceForm = this.formBuilder.group({
          ad_ID: [''],
          ad_fecha: [this.date, Validators.required],
          ad_cantidad: [montoAdelanto, Validators.required],
          ad_dest_adv: [1, Validators.required],
          ad_prov_cus_ID: [this.stateCustomerId, Validators.required],
          ad_estado: [0, Validators.required],
          ad_created_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
          ad_updated_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")
        });

        console.log("Ingreso monto negativo");

        this.advancesService.createData(this.advanceForm.value)
            .subscribe({
              next: (res) => {
                this._toastService.info('Nuevo Adelanto Agregado');

                //Agregando Adelanto Sobrante a Caja
                this.advancesStateService.getLastAdvanceId()
                .subscribe({
                  next: (res) => {
                    let lastAdvanceId = res[0].ad_ID;

                    this.cashRegisterForm = this.formBuilder.group({
                      cas_monto: [montoAdelanto],
                      cas_fecha: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
                      cas_pur_sal_ID: [lastAdvanceId],
                      cas_des: ["AC"],
                      cas_estado: ['1'],
                      cas_concepto: ['Adelanto Cliente'],
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

      //VALORES POSITIVOS INGRESAN AQUI
    } else {
      this.advancesCustomerService.getAdvanceForCustomerAndState(this.stateCustomerId).subscribe(res => {
        this.listAvancesForCustomer = res[0];

        if (this.listAvancesForCustomer?.length) {
          console.log(this.listAvancesForCustomer);

          //Cambia el estado del Adelanto del Cliente
          this.advancesStateService.changeStateForAdvanceToCustomer(1, this.stateCustomerId)
          .subscribe({
                  next: (res) => {
                    console.log("Estado de Cliente Modificado Parte__ ", this.stateCustomerId);
                  },
                  error: (e) => {
                    console.log(e);
                  }
            })

        } else {
          console.log("No hay adelanto ",this.listAvancesForCustomer);
        }
  
      });

    }

  }

  addNewSales() {
    if (this.listSalesForm.valid) {
      this.salesService.createData(this.listSalesForm.value)
        .subscribe({
          next: (res) => {
            this._toastService.success('Venta Agregada Satisfactoriamente!!!');

            this.addSalesDetail();
            this.getAllTemporarySalesDetail();
            this.getTotalSalesDetail();
            this.getAllSalesForDate();
            // this.deleteAllTemporarySalesDetail();
            this.getAdvanceForCustomer();
            this.changeStateOFAdvanceCustomer();

            //Agregando Venta a Caja
            let salesTotal;
            if (this.amountCustomer === undefined) {
              salesTotal = this.getTotalSales;            
            } else {
              salesTotal = this.getTotalSales-this.amountCustomer;
            }

            if (salesTotal < 0) {
              salesTotal = 0;              
            }

            this.cashRegisterForm = this.formBuilder.group({
              cas_monto: [salesTotal],
              cas_fecha: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
              cas_pur_sal_ID: [this.saleIdNumber],
              cas_des: ["VT"],
              cas_estado: ['1'],
              cas_concepto: ['Venta Material'],
              cas_emp_ID: ['1'],
              cas_created_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")],
              cas_updated_at: [moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss")]
            });

            this.cashRegisterService.createData(this.cashRegisterForm.value)
            .subscribe({
              next: (res) => {
                console.log("Venta Agregada a Caja");
                this.cashRegisterForm.reset();
              },
              error: (e) => {
                console.log("Error", e)
              }
            })

            this.temporarySalesDetailForm = this.formBuilder.group({
              sal_ID: [''],
              sal_prod_ID: ['', Validators.required],
              sal_sa_ID: [this.saleIdNumber, Validators.required],
              sal_peso: ['', Validators.required],
              sal_precio: ['', Validators.required],
              sal_created_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
              sal_updated_at: moment(this.date).format("YYYY-MM-DDTHH:mm:ss.sss"),
            });

            this.listSalesForm.reset();

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

            this.ticketSaleForm = this.formBuilder.group({
              tick_sal_ID: [''],
              tick_sal_ruc: [10471206170, Validators.required],
              tick_sal_serie: ['00', Validators.required],
              tick_sal_serie_numero: [1, Validators.required],
              tick_sal_numero: [this.numLastTicket3, Validators.required],
              tick_sal_boleta: [this.numberTicket, Validators.required],
              tick_sal_boleta_final: [100000]
            });

            this.ticketSaleService.createData(this.ticketSaleForm.value).subscribe({
              next: (res) => {
                console.log("Boleta Agregada");
                this.getLastSaleId();
                this.getGenerateTicketNumber();
              },
              error: (e) => {
                console.log("Error", e)
              }
            })

            this.ticketSaleForm.reset();

          },
          error: () => {
            this._toastService.error('Error al Agregar Venta!!!');
          }
        })
    }

  }

  deleteOneSale(id: any) {
    console.log(id, 'deleteid ==>');
    this.salesService.deleteData(id).subscribe({
      next: (res) => {
        this._toastService.warn('Venta Eliminada Satisfactoriamente!!!');
        this.getAllSalesForDate();
      },
      error: () => {
        this._toastService.error('Error!!! No se puede Eliminar Venta!!!');
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


  openDialogViewSaleDetail(element: any) {
    this.dialog.open(SalesDialogComponent, {
      // width: '30%',
      data: element
    }).afterClosed().subscribe(value => {
      if (value === 'update') {
        this.getAllSalesForDate();
      }
    });
  }


}
