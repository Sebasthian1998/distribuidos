// ----------------------- Imports - Angular ------------------------------- //
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from "./core-angular-material/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor'
// -------------------------- Componentes --------------------------------- //
import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { ProductoComponent } from './components/producto/producto.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { BalancesComponent } from './components/balances/balances.component';
import { ReportesComponent } from './components/reportes/reportes.component';

import { AuthGuard } from './services/auth.guard';
import { AuthService } from './services/auth.service';
import { EmpleadosComponent } from './components/empleados/empleados.component';

import { MatPaginatorModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    ProductoComponent,
    LoginComponent,
    HomeLayoutComponent,
    LoginLayoutComponent,
    NavigationComponent,
    ProveedoresComponent,
    BalancesComponent,
    ReportesComponent,
    EmpleadosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
