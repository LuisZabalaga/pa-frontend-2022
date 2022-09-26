import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.getAllProductsForCategory1();
    this.getAllProductsForCategory2();
    this.getAllProductsForCategory3();
    this.getAllProductsForCategory4();
    this.getAllProductsForCategory5();
    this.getAllProductsForCategory6();
  }

  listCategory1: any;
  listCategory2: any;
  listCategory3: any;
  listCategory4: any;
  listCategory5: any;
  listCategory6: any;

  listCompraAluminio: any;
  listVentaAluminio: any;
  listTotalAluminio: any;
  listPesoAqpAluminio: any;


  getAllProductsForCategory1 () {
    this.reportsService.getProductsForCategory(1).subscribe(res => {
      this.listCategory1 = res;

      this.listCompraAluminio = this.listCategory1.map(item => parseInt(item.prod_peso_total)).reduce(
        (prev, curr) => prev + curr, 0);
      this.listVentaAluminio = this.listCategory1.map(item => parseInt(item.prod_peso_aqp)).reduce(
        (prev, curr) => prev + curr, 0);
      this.listPesoAqpAluminio = this.listCategory1.map(item => parseInt(item.prod_peso_local)).reduce(
        (prev, curr) => prev + curr, 0);
    });
  }

  getAllProductsForCategory2 () {
    this.reportsService.getProductsForCategory(2).subscribe(res => {
      this.listCategory2 = res;
    });
  }

  getAllProductsForCategory3 () {
    this.reportsService.getProductsForCategory(3).subscribe(res => {
      this.listCategory3 = res;
    });
  }

  getAllProductsForCategory4 () {
    this.reportsService.getProductsForCategory(4).subscribe(res => {
      this.listCategory4 = res;
    });
  }

  getAllProductsForCategory5 () {
    this.reportsService.getProductsForCategory(5).subscribe(res => {
      this.listCategory5 = res;
    });
  }

  getAllProductsForCategory6 () {
    this.reportsService.getProductsForCategory(6).subscribe(res => {
      this.listCategory6 = res;
    });
  }

}
