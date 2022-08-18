import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AdvancesService } from 'src/app/services/advances.service';
import { ProvidersService } from 'src/app/services/providers.service';
import { ToastService } from 'angular-toastify';  
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdvancesDialogComponent } from '../advances-dialog/advances-dialog.component';

@Component({
  selector: 'app-advances-customers-dialog',
  templateUrl: './advances-customers-dialog.component.html',
  styleUrls: ['./advances-customers-dialog.component.css']
})
export class AdvancesCustomersDialogComponent implements OnInit {

  advanceForm !: FormGroup;
  actionBtn: string = "Agregar";
  listAdvancesIdCustomers: any;

  displayedColumns: string[] = ['posicion', 'fecha', 'cantidad', 'clientes', 'estado', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
    private advancesService: AdvancesService,
    private providersService: ProvidersService,
    private formBuilder: FormBuilder,
    private _toastService: ToastService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public advanceForId: any,
    private dialogRef: MatDialogRef<AdvancesCustomersDialogComponent>) { }

  ngOnInit(): void {

    this.getAdvanceForIdCustomersAndDate();

  }

  getAdvanceForIdCustomersAndDate() {
    console.log(this.advanceForId);
    // console.log();
    this.advancesService.getAdvancesForIdCustomerAndDate(1, this.advanceForId.element.ad_prov_cus_ID, this.advanceForId.element.ad_estado, this.advanceForId.inicial, this.advanceForId.final).subscribe(res => {
      this.listAdvancesIdCustomers = res[0] 
      // console.log(this.listAdvancesIdCustomers);

      this.dataSource = new MatTableDataSource(this.listAdvancesIdCustomers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  deleteOneAdvance(id:any) {
    console.log(id, 'deleteid ==>');
    this.advancesService.deleteData(id).subscribe({
      next: (res) => {
        this._toastService.success('Adelanto Eliminado Satisfactoriamente!!!');
        this.getAdvanceForIdCustomersAndDate();
        // this.dialogRef.close();
      },
      error: () => {
        this._toastService.error('Error!!! No se puede Eliminar Adelanto!!');
      }
      
    });

  }

  openDialogEditAdvance(element: any ) {
    this.dialog.open(AdvancesDialogComponent, {
      // width: '30%',
      data: element
    }).afterClosed().subscribe(value =>{
      
      if(value === 'update') {
        this.dialogRef.close('update');
        // this.getAllAdvancesForProviderAndDate();
        // this.getAllTotalAdvancesForCustomerAndDate();
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


}
