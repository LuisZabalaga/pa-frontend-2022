import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';

//Components Modules
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AreaComponent } from './widgets/area/area.component';
import { CardComponent } from './widgets/card/card.component';
import { PieComponent } from './widgets/pie/pie.component';
import { DialogComponent } from '../modules/customers/dialog/dialog.component';
import { ProviderDialogComponent } from '../modules/providers/provider-dialog/provider-dialog.component';
import { CategorieDialogComponent } from '../modules/categories/categorie-dialog/categorie-dialog.component';
import { ProductDialogComponent } from '../modules/products/product-dialog/product-dialog.component';
import { ExpenseDialogComponent } from '../modules/expenses/expense-dialog/expense-dialog.component';
import { CashRegisterDialogComponent } from '../modules/cash-register/cash-register-dialog/cash-register-dialog.component';
import { EmployeesDialogComponent } from '../modules/employees/employees-dialog/employees-dialog.component';
import { SalesDialogComponent } from '../modules/sales/sales-dialog/sales-dialog.component';
import { ShoppingDialogComponent } from '../modules/shopping/shopping-dialog/shopping-dialog.component';

import { LoginComponent } from '../modules/login/login.component';

//Angular Material
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';


// import { NgxMatFileInputModule } from '@angular-material-components/file-input';


@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent, 
    AreaComponent, 
    CardComponent, 
    PieComponent,
    DialogComponent,
    ProviderDialogComponent,
    CategorieDialogComponent,
    ProductDialogComponent,
    ExpenseDialogComponent,
    CashRegisterDialogComponent,
    EmployeesDialogComponent,
    SalesDialogComponent,
    ShoppingDialogComponent,

    LoginComponent
  ],
  imports: [
    CommonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatCheckboxModule,
    MatDividerModule,
    FlexLayoutModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    MatDialogModule,
    MatTabsModule
  ],
  exports: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent,
    AreaComponent,
    CardComponent,
    PieComponent,
    CommonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatRadioModule,    
    MatCheckboxModule,
    MatDatepickerModule,
    // MatNativeDateModule,
    MatMomentDateModule,
    MatDividerModule,
    FlexLayoutModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    HighchartsChartModule,
    MatDialogModule,
    // NgxMatFileInputModule
    MatTabsModule
  ]
})

export class SharedModule { }
