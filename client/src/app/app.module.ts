import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

// Modulos
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

// Componentes
import { LoginComponent } from './components/login/login.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AddTokenInterceptor } from './utils/add-token.interceptor';
import { ProductComponent } from './components/product/product.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { ListarComponent } from './components/empleado/listar/listar.component';
import { CrearEditarComponent } from './components/empleado/crear-editar/crear-editar.component';
import { NotaventaComponent } from './components/notaventa/notaventa.component';
import { VentarealizadaComponent } from './components/ventarealizada/ventarealizada.component';
import { ReporteComponent } from './components/reporte/reporte.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    DashboardComponent,
    NavbarComponent,
    SpinnerComponent,
    ProductComponent,
    CategoriaComponent,
    ClienteComponent,
    ListarComponent,
    CrearEditarComponent,
    NotaventaComponent,
    VentarealizadaComponent,
    ReporteComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, // Añadir ReactiveFormsModule a imports
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule added
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
