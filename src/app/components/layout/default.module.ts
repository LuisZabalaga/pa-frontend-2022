import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { DashboardService } from '../modules/dashboard.service';

//Components
import { DefaultComponent } from './default/default.component';
import { DashboardComponent } from '../modules/dashboard/dashboard.component';
import { CustomersComponent } from '../modules/customers/customers.component';
import { ProvidersComponent } from '../modules/providers/providers.component';
import { CategoriesComponent } from '../modules/categories/categories.component';
import { ProductsComponent } from '../modules/products/products.component';
import { ExpensesComponent } from '../modules/expenses/expenses.component';
import { CashRegisterComponent } from '../modules/cash-register/cash-register.component';
import { EmployeesComponent } from '../modules/employees/employees.component';
import { SalesComponent } from '../modules/sales/sales.component';
import { ShoppingComponent } from '../modules/shopping/shopping.component';



@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    CustomersComponent,
    ProvidersComponent,
    CategoriesComponent,
    ProductsComponent,
    ExpensesComponent,
    CashRegisterComponent,
    EmployeesComponent,
    SalesComponent,
    ShoppingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  providers: [DashboardService]
})
export class DefaultModule { }
