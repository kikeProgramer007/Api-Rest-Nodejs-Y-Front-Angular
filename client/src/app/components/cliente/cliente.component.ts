import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
})

export class ClienteComponent implements OnInit {

  Lista: Cliente[] = []
  accion = 'Crear';
  id: number | undefined;

  nombre: string = '';
  ci: number = 0;
  loading: boolean = false;

  //Contructor
  constructor(
    private _clienteService: ClienteService,
    private toastr: ToastrService,
    private _errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this._clienteService.getLista().subscribe(data => {
      this.Lista = data;
    })
  }

  Add(){
    // Validamos que el cliente ingrese valores
    if (this.nombre == '') {
        this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    
    // Creamos el objeto
    var cliente:  any = {
      id: (this.id== undefined)?0:this.id,
      nombre: this.nombre,
      ci: this.ci,
    }

    this.loading = true;
    if(this.id == undefined){
      this._clienteService.save(cliente).subscribe({
        next: (v) => {
          this.loading = false;
          this.toastr.success(`La cliente ${this.nombre} fue registrado con exito`, 'Cliente registrado');
          this.resetForm();
          this.getList();
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          this._errorService.msjError(e);
        }
      })
    }else{
     
      this._clienteService.update(this.id,cliente).subscribe({
        next: (v) => {
          this.loading = false;
          this.accion = 'Crear';
          this.toastr.success(`El Cliente ${this.nombre} fue Actualizado con exito`, 'Cliente actualizado');
          this.resetForm();
          this.getList();
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          this._errorService.msjError(e);
        }
      })

    }
  }

  Update(cliente: Cliente){
    this.accion = 'Editar';
    this.id = cliente.id;
    this.nombre = cliente.nombre;
    this.ci = cliente.ci;
   }

   Delete(id: number){
    this.loading = true;
    this._clienteService.delete(id).subscribe({
      next: (v) => {
        this.toastr.success(`El Cliente ${this.nombre} fue elimado con exito`, 'Cliente Eliminado');
        this.getList();
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      }
    })

  }

   private resetForm() {
    this.nombre = '';
    this.id = undefined;
    this.ci = 0;
  }
}
