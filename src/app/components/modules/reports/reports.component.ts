import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { HotTableModule } from '@handsontable/angular';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private reportsService: ReportsService) { }

  @ViewChild('table_content_report', { static:false }) el!: ElementRef

  datee = moment();
  // let dateInFormat = datee.format('YYYY-MM-DD');
  // console.log(dateInFormat);
        
  
  date: Date = new Date();

  dates: any;

  inicial: any;
  final: any;

  range = new FormGroup({
    start: new FormControl(this.date),
    end: new FormControl(this.date),
  });

  ngOnInit(): void {
    this.getWeightProductsForAluminum();
    this.getTotalPurchasesForCategorieAluminum();

    this.getWeightProductsForBronze();
    this.getTotalPurchasesForCategorieBronze();

    this.getWeightProductsForCopper();
    this.getTotalPurchasesForCategorieCopper();

    this.getWeightProductsForOthers();
    this.getTotalPurchasesForCategorieOthers();

    this.getWeightProductsForCastIron();
    this.getTotalPurchasesForCategorieCastIron();

    this.getWeightProductsForBatteries();
    this.getTotalPurchasesForCategorieBatteries();
  }

  //Aluminum
  listCategoryAluminum: any;
  listInvestmentAluminum: any;
  totalInvestmentAluminum: any;
  weightAluminumPurchase: any;
  weightAluminumSales: any;
  totalWeightAluminum: any;
  aqpWeightAluminum: any;

  //Bronze
  listCategoryBronze: any;
  listInvestmentBronze: any;
  totalInvestmentBronze: any;
  weightBronzePurchase: any;
  weightBronzeSales: any;
  totalWeightBronze: any;
  aqpWeightBronze: any;

  //Copper
  listCategoryCopper: any;
  listInvestmentCopper: any;
  totalInvestmentCopper: any;
  weightCopperPurchase: any;
  weightCopperSales: any;
  totalWeightCopper: any;
  aqpWeightCopper: any;

  //Others
  listCategoryOthers: any;
  listInvestmentOthers: any;
  totalInvestmentOthers: any;
  weightOthersPurchase: any;
  weightOthersSales: any;
  totalWeightOthers: any;
  aqpWeightOthers: any;

  //Cast Iron
  listCategoryCastIron: any;
  listInvestmentCastIron: any;
  totalInvestmentCastIron: any;
  weightCastIronPurchase: any;
  weightCastIronSales: any;
  totalWeightCastIron: any;
  aqpWeightCastIron: any;

  //Batteries
  listCategoryBatteries: any;
  listInvestmentBatteries: any;
  totalInvestmentBatteries: any;
  weightBatteriesPurchase: any;
  weightBatteriesSales: any;
  totalWeightBatteries: any;
  aqpWeightBatteries: any;

  listCategory3: any;
  listCategory4: any;
  listCategory5: any;
  listCategory6: any;


  data: any[] = [
    ['', 'Tesla', 'Mercedes', 'Toyota', 'Volvo'],
    ['2019', 10, 11, 12, 13],
    ['2020', 20, 11, 14, 13],
    ['2021', 30, 15, 12, 13]
  ]

  //Aluminum
  getWeightProductsForAluminum () {
    this.reportsService.getWeightOfProductsForCategory(1).subscribe(res => {
      this.listCategoryAluminum = res;

      this.weightAluminumPurchase = this.listCategoryAluminum.map(item => parseInt(item.prod_peso_total)).reduce(
        (prev, curr) => prev + curr, 0);
      this.weightAluminumSales = this.listCategoryAluminum.map(item => parseInt(item.prod_peso_aqp)).reduce(
        (prev, curr) => prev + curr, 0);
      this.aqpWeightAluminum = this.listCategoryAluminum.map(item => parseInt(item.prod_peso_aqp)).reduce(
        (prev, curr) => prev + curr, 0);
    });
  }
  getTotalPurchasesForCategorieAluminum () {
    this.dates = this.range.value;
    const dateStart = new Date(this.dates.start); //Replace event.value with your date value
    const dateEnd = new Date(this.dates.end);
    const forDateStart = moment(dateStart).format("YYYY-MM-DD");
    const forDateEnd = moment(dateEnd).format("YYYY-MM-DD");

    this.reportsService.getTotalPurchaseForCategorieAndDate(1, forDateStart, forDateEnd).subscribe(res => {
      this.listInvestmentAluminum = res[0];
       if (this.listInvestmentAluminum === undefined) {
        this.totalInvestmentAluminum = 0;
      } else {
        this.totalInvestmentAluminum = this.listInvestmentAluminum.ca_total;
      }        
    });    
  }

  //Bronze
  getWeightProductsForBronze () {
    this.reportsService.getWeightOfProductsForCategory(2).subscribe(res => {
      this.listCategoryBronze = res;

      this.weightBronzePurchase = this.listCategoryBronze.map(item => parseInt(item.prod_peso_total)).reduce(
        (prev, curr) => prev + curr, 0);
      this.weightBronzeSales = this.listCategoryBronze.map(item => parseInt(item.prod_peso_aqp)).reduce(
        (prev, curr) => prev + curr, 0);
      this.aqpWeightBronze = this.listCategoryBronze.map(item => parseInt(item.prod_peso_aqp)).reduce(
        (prev, curr) => prev + curr, 0);
    });
  }
  getTotalPurchasesForCategorieBronze () {
    this.dates = this.range.value;
    const dateStart = new Date(this.dates.start); //Replace event.value with your date value
    const dateEnd = new Date(this.dates.end);
    const forDateStart = moment(dateStart).format("YYYY-MM-DD");
    const forDateEnd = moment(dateEnd).format("YYYY-MM-DD");

    this.reportsService.getTotalPurchaseForCategorieAndDate(2, forDateStart, forDateEnd).subscribe(res => {
      this.listInvestmentBronze = res[0];
      if (this.listInvestmentBronze === undefined) {
        this.totalInvestmentBronze = 0;
      } else {
        this.totalInvestmentBronze = this.listInvestmentBronze.ca_total;
      }       
    });
  }

  //Copper
  getWeightProductsForCopper () {
    this.reportsService.getWeightOfProductsForCategory(3).subscribe(res => {
      this.listCategoryCopper = res;

      this.weightCopperPurchase = this.listCategoryCopper.map(item => parseInt(item.prod_peso_total)).reduce(
        (prev, curr) => prev + curr, 0);
      this.weightCopperSales = this.listCategoryCopper.map(item => parseInt(item.prod_peso_aqp)).reduce(
        (prev, curr) => prev + curr, 0);
      this.aqpWeightCopper = this.listCategoryCopper.map(item => parseInt(item.prod_peso_aqp)).reduce(
        (prev, curr) => prev + curr, 0);
    });    
  }
  getTotalPurchasesForCategorieCopper () {
    this.dates = this.range.value;
    const dateStart = new Date(this.dates.start); //Replace event.value with your date value
    const dateEnd = new Date(this.dates.end);
    const forDateStart = moment(dateStart).format("YYYY-MM-DD");
    const forDateEnd = moment(dateEnd).format("YYYY-MM-DD");

    this.reportsService.getTotalPurchaseForCategorieAndDate(3, forDateStart, forDateEnd).subscribe(res => {
      this.listInvestmentCopper = res[0];
      if (this.listInvestmentCopper === undefined) {
        this.totalInvestmentCopper = 0;
      } else {
        this.totalInvestmentCopper = this.listInvestmentCopper.ca_total;
      }         
    });
  }

  //Others
  getWeightProductsForOthers () {
    this.reportsService.getWeightOfProductsForCategory(4).subscribe(res => {
      this.listCategoryOthers = res;

      this.weightOthersPurchase = this.listCategoryOthers.map(item => parseInt(item.prod_peso_total)).reduce(
        (prev, curr) => prev + curr, 0);
      this.weightOthersSales = this.listCategoryOthers.map(item => parseInt(item.prod_peso_aqp)).reduce(
        (prev, curr) => prev + curr, 0);
      this.aqpWeightOthers = this.listCategoryOthers.map(item => parseInt(item.prod_peso_aqp)).reduce(
        (prev, curr) => prev + curr, 0);
    });    
  }
  getTotalPurchasesForCategorieOthers () {
    this.dates = this.range.value;
    const dateStart = new Date(this.dates.start); //Replace event.value with your date value
    const dateEnd = new Date(this.dates.end);
    const forDateStart = moment(dateStart).format("YYYY-MM-DD");
    const forDateEnd = moment(dateEnd).format("YYYY-MM-DD");

    this.reportsService.getTotalPurchaseForCategorieAndDate(4, forDateStart, forDateEnd).subscribe(res => {
      this.listInvestmentOthers = res[0];
      if (this.listInvestmentOthers === undefined) {
        this.totalInvestmentOthers = 0;
      } else {
        this.totalInvestmentOthers = this.listInvestmentOthers.ca_total;
      }       
    });
  }

  //Cast Iron
  getWeightProductsForCastIron () {
    this.reportsService.getWeightOfProductsForCategory(5).subscribe(res => {
      this.listCategoryCastIron = res;

      this.weightCastIronPurchase = this.listCategoryCastIron.map(item => parseInt(item.prod_peso_total)).reduce(
        (prev, curr) => prev + curr, 0);
      this.weightCastIronSales = this.listCategoryCastIron.map(item => parseInt(item.prod_peso_aqp)).reduce(
        (prev, curr) => prev + curr, 0);
      this.aqpWeightCastIron = this.listCategoryCastIron.map(item => parseInt(item.prod_peso_aqp)).reduce(
        (prev, curr) => prev + curr, 0);
    });    
  }
  getTotalPurchasesForCategorieCastIron () {
    this.dates = this.range.value;
    const dateStart = new Date(this.dates.start); //Replace event.value with your date value
    const dateEnd = new Date(this.dates.end);
    const forDateStart = moment(dateStart).format("YYYY-MM-DD");
    const forDateEnd = moment(dateEnd).format("YYYY-MM-DD");

    this.reportsService.getTotalPurchaseForCategorieAndDate(5, forDateStart, forDateEnd).subscribe(res => {
      this.listInvestmentCastIron = res[0];
      if (this.listInvestmentCastIron === undefined) {
        this.totalInvestmentCastIron = 0;
      } else {
        this.totalInvestmentCastIron = this.listInvestmentCastIron.ca_total;
      }      
    });
  }

  getWeightProductsForBatteries () {
    this.reportsService.getWeightOfProductsForCategory(6).subscribe(res => {
      this.listCategoryBatteries = res;

      this.weightBatteriesPurchase = this.listCategoryBatteries.map(item => parseInt(item.prod_peso_total)).reduce(
        (prev, curr) => prev + curr, 0);
      this.weightBatteriesSales = this.listCategoryBatteries.map(item => parseInt(item.prod_peso_aqp)).reduce(
        (prev, curr) => prev + curr, 0);
      this.aqpWeightBatteries = this.listCategoryBatteries.map(item => parseInt(item.prod_peso_aqp)).reduce(
        (prev, curr) => prev + curr, 0);
    });    
  }
  getTotalPurchasesForCategorieBatteries () {
    this.dates = this.range.value;
    const dateStart = new Date(this.dates.start); //Replace event.value with your date value
    const dateEnd = new Date(this.dates.end);
    const forDateStart = moment(dateStart).format("YYYY-MM-DD");
    const forDateEnd = moment(dateEnd).format("YYYY-MM-DD");

    this.reportsService.getTotalPurchaseForCategorieAndDate(6, forDateStart, forDateEnd).subscribe(res => {
      this.listInvestmentBatteries = res[0];
      if (this.listInvestmentBatteries === undefined) {
        this.totalInvestmentBatteries = 0;
      } else {
        this.totalInvestmentBatteries = this.listInvestmentBatteries.ca_total;
      }      
    });
  }

  executeAllFuntionsForCategories () {
    this.getTotalPurchasesForCategorieAluminum();
    this.getTotalPurchasesForCategorieBronze();
    this.getTotalPurchasesForCategorieCopper();
    this.getTotalPurchasesForCategorieOthers();
    this.getTotalPurchasesForCategorieCastIron();
    this.getTotalPurchasesForCategorieBatteries();
  }

  title = "Export-to-excel";
  fileName = 'Reporte de Ventas.xls';

  exportTableReportToExcel () {
    let table = document.getElementById('table-report');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, this.fileName);
  }

  exportTableReportToPdf () {
    const DATA: any = document.getElementById('table-report');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    }
    html2canvas(DATA, options).then((canvas) => {
      const img = canvas.toDataURL('image/PNG');
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(
        img,
        'PNG',
        bufferX,
        bufferY,
        pdfWidth,
        pdfHeight,
        undefined,
        'FAST'
      );
      return doc;
    })
    .then((docResult) => {
      docResult.save(`${new Date().toISOString()}_reporte_compras.pdf`);
    });

    // const DATA: any = document.getElementById('table-report');
    // const doc = new jsPDF('p', 'pt', 'a4');
    // const options = {
    //   background: 'white',
    //   scale: 3
    // }

    //   let pageHeight = doc.internal.pageSize.height; // Tamaño de una pagina
    //   let pageHeightLeft = pageHeight; // La utilizaremos para ver cuanto espacio nos queda
    //   let position = 0;

    //   for(let i = 0; i < DATA.length; i++) {
        
    //     html2canvas(DATA[i]).then((canvas) => {
    //       // Comprobamos salto
    //       const img = canvas.toDataURL('image/PNG');
    //       if (pageHeightLeft - canvas.height <= 0) {
    //         doc.addPage();
    //         position = 0; // Pintaremos en el inicio de la nueva pagina
    //       }
    //       doc.addImage(
    //         img, 
    //         'PNG', 
    //         15, 
    //         15, 
    //         canvas.width, 
    //         canvas.height, 
    //         undefined,
    //         'FAST'
    //       );
    //       position += canvas.height; // Marcamos el siguiente inicio
    //       pageHeightLeft -= canvas.height; // Marcamos cuanto espacio nos queda
    //       return doc;
    //     })
    //     .then((docResult) => {
    //         docResult.save(`${new Date().toISOString()}_reporte_compras.pdf`);
    //       });
    //   }    

  }


}
