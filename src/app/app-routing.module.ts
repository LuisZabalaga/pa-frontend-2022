import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './components/layout/default/default.component';
import { LoginComponent } from './components/modules/login/login.component';
import { AdvancesComponent } from './components/modules/advances/advances.component';
import { CashRegisterComponent } from './components/modules/cash-register/cash-register.component';
import { CategoriesComponent } from './components/modules/categories/categories.component';
import { CustomersComponent } from './components/modules/customers/customers.component';
import { DashboardComponent } from './components/modules/dashboard/dashboard.component';
import { EmployeesComponent } from './components/modules/employees/employees.component';
import { ExpensesComponent } from './components/modules/expenses/expenses.component';
import { ProductsComponent } from './components/modules/products/products.component';
import { ProvidersComponent } from './components/modules/providers/providers.component';
import { ReportsComponent } from './components/modules/reports/reports.component';
import { SalesComponent } from './components/modules/sales/sales.component';
import { ShoppingComponent } from './components/modules/shopping/shopping.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '', 
    component: DefaultComponent, 
    children: [
      { 
        path: '',
        component: DashboardComponent
      }, {
        path: 'customers',
        component: CustomersComponent
      }, {
        path: 'providers',
        component: ProvidersComponent
      }, {
        path: 'products',
        component: ProductsComponent
      }, {
        path: 'categories',
        component: CategoriesComponent
      }, {
        path: 'expenses',
        component: ExpensesComponent
      }, {
        path: 'employees',
        component: EmployeesComponent
      }, {
        path: 'cash-register',
        component: CashRegisterComponent
      }, {
        path: 'sales',
        component: SalesComponent
      }, {
        path: 'shopping',
        component: ShoppingComponent
      }, {
        path: 'advances',
        component: AdvancesComponent
      }, {
        path: 'reports',
        component: ReportsComponent
      },
    ]
    
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
