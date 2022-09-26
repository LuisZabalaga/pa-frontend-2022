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
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '', 
    component: DefaultComponent, canActivate: [AuthGuard], 
    children: [
      { 
        path: '',
        component: DashboardComponent, canActivate: [AuthGuard], 
      }, {
        path: 'customers',
        component: CustomersComponent, canActivate: [AuthGuard]
      }, {
        path: 'providers',
        component: ProvidersComponent, canActivate: [AuthGuard]
      }, {
        path: 'products',
        component: ProductsComponent, canActivate: [AuthGuard]
      }, {
        path: 'categories',
        component: CategoriesComponent, canActivate: [AuthGuard]
      }, {
        path: 'expenses',
        component: ExpensesComponent, canActivate: [AuthGuard]
      }, {
        path: 'employees',
        component: EmployeesComponent, canActivate: [AuthGuard]
      }, {
        path: 'cash-register',
        component: CashRegisterComponent, canActivate: [AuthGuard]
      }, {
        path: 'sales',
        component: SalesComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 1 }
      }, {
        path: 'shopping',
        component: ShoppingComponent, canActivate: [AuthGuard]
      }, {
        path: 'advances',
        component: AdvancesComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 1 }
      }, {
        path: 'reports',
        component: ReportsComponent, canActivate: [AuthGuard, RoleGuard], data: { expectedRole: 1 }
      }, {
        path: '**', redirectTo: ''
      }
    ]
    
  }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
