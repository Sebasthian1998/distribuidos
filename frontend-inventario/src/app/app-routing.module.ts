import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';
import { ProductoComponent } from './components/producto/producto.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { BalancesComponent } from './components/balances/balances.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { AuthGuard } from './services/auth.guard';
import { EmpleadosComponent } from './components/empleados/empleados.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', data: { title: 'First Component' }, pathMatch: 'full' },
  {
    path: 'login', component: LoginLayoutComponent, data: { title: 'First Component' },
    children: [
      { path: '', component: LoginComponent }
    ]
  },
  {
    path: 'home', component: HomeLayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'productos', pathMatch: 'full' },
      { path: 'proveedores', component: ProveedoresComponent, canActivate: [AuthGuard] },
      { path: 'balances', component: BalancesComponent, canActivate: [AuthGuard] },
      { path: 'productos', component: ProductoComponent, canActivate: [AuthGuard] },
      { path: 'reportes', component: ReportesComponent, canActivate: [AuthGuard] },
      { path: 'empleados', component: EmpleadosComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', component: ErrorComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
