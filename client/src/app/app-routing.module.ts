import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ProductComponent } from './components/product/product.component';
// Guards
import { AuthGuard } from './utils/auth.guard';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ListarComponent } from './components/empleado/listar/listar.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signIn', component: SignInComponent },
  { path: 'categoria', component: CategoriaComponent },
  { path: 'product', component: ProductComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'empleado', component: ListarComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
