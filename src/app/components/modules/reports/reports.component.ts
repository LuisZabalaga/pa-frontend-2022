import { Component, OnInit } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { HotTableModule } from '@handsontable/angular';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.getWeightProductsForAluminum();
    this.getTotalPurchaseForCategorieAluminum ();

    this.getAllProductsForCategory2();
    this.getAllProductsForCategory3();
    this.getAllProductsForCategory4();
    this.getAllProductsForCategory5();
    this.getAllProductsForCategory6();
  }

  listCategoryAluminum: any;
  listTotalCategoryAluminum: any;
  totalAluminum: any;

  listCategory2: any;
  listCategory3: any;
  listCategory4: any;
  listCategory5: any;
  listCategory6: any;

  listCompraAluminio: any;
  listVentaAluminio: any;
  listTotalAluminio: any;
  listPesoAqpAluminio: any;

  data: any[] = [
    ['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
    ['2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13]
  ]


  getWeightProductsForAluminum () {
    this.reportsService.getWeightOfProductsForCategory(1).subscribe(res => {
      this.listCategoryAluminum = res;

      this.listCompraAluminio = this.listCategoryAluminum.map(item => parseInt(item.prod_peso_total)).reduce(
        (prev, curr) => prev + curr, 0);
      this.listVentaAluminio = this.listCategoryAluminum.map(item => parseInt(item.prod_peso_aqp)).reduce(
        (prev, curr) => prev + curr, 0);
      this.listPesoAqpAluminio = this.listCategoryAluminum.map(item => parseInt(item.prod_peso_local)).reduce(
        (prev, curr) => prev + curr, 0);
    });
  }

  getTotalPurchaseForCategorieAluminum () {
    this.reportsService.getTotalPurchaseForCategorieAndDate(1, '2022-09-01', '2022-09-30').subscribe(res => {
      this.listTotalCategoryAluminum = res[0];
      this.totalAluminum = this.listTotalCategoryAluminum.ca_total;
      console.log(this.listTotalCategoryAluminum)
    });
  }

  getAllProductsForCategory2 () {
    this.reportsService.getWeightOfProductsForCategory(2).subscribe(res => {
      this.listCategory2 = res;
    });
  }

  getAllProductsForCategory3 () {
    this.reportsService.getWeightOfProductsForCategory(3).subscribe(res => {
      this.listCategory3 = res;
    });
  }

  getAllProductsForCategory4 () {
    this.reportsService.getWeightOfProductsForCategory(4).subscribe(res => {
      this.listCategory4 = res;
    });
  }

  getAllProductsForCategory5 () {
    this.reportsService.getWeightOfProductsForCategory(5).subscribe(res => {
      this.listCategory5 = res;
    });
  }

  getAllProductsForCategory6 () {
    this.reportsService.getWeightOfProductsForCategory(6).subscribe(res => {
      this.listCategory6 = res;
    });
  }

}
