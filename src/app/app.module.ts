import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { LOCALE_ID, NgModule } from '@angular/core';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastService, AngularToastifyModule } from 'angular-toastify'; 

//Components
// import { CreateComponent } from './create/create.component';
// import { ReadComponent } from './read/read.component';


//Services
import { ApiserviceService } from './services/apiservice.service';
import { ProductsService } from './services/products.service';
import { ProvidersService } from './services/providers.service';
import { CustomerService } from './services/customer.service';
import { CategoriesService } from './services/categories.service';
import { CashRegisterService } from './services/cash-register.service';
import { EmployeesService } from './services/employees.service';
import { ExpensesService } from './services/expenses.service';
import { SalesService } from './services/sales.service';
import { PurchasesService } from './services/purchases.service';

//Modules
import { DefaultModule } from './components/layout/default.module';
import { SharedModule } from './components/shared/shared.module';
import { AdvancesComponent } from './components/modules/advances/advances.component';
import { AdvancesDialogComponent } from './components/modules/advances/advances-dialog/advances-dialog.component';
import { ReportsComponent } from './components/modules/reports/reports.component';
import { AdvancesCustomersDialogComponent } from './components/modules/advances/advances-customers-dialog/advances-customers-dialog.component';

registerLocaleData(localeEs, 'Es');

@NgModule({
  declarations: [
    AppComponent,
    // CreateComponent,
    // ReadComponent,
    AdvancesComponent,
    AdvancesDialogComponent,
    ReportsComponent,
    AdvancesCustomersDialogComponent,

  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularToastifyModule,
    SharedModule,
    DefaultModule
  ],
  providers: [
    ApiserviceService,
    ProductsService,
    ProvidersService,
    CustomerService,
    CategoriesService,
    CashRegisterService,
    EmployeesService,
    ExpensesService,
    SalesService,
    PurchasesService,
    ToastService,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
