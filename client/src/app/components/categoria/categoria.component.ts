import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/interfaces/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
})

export class CategoriaComponent implements OnInit {

  Lista: Categoria[] = []
  accion = 'Crear';
  id: number | undefined;

  nombre: string = '';
  loading: boolean = false;

  //Contructor
  constructor(
    private _categoriaService: CategoriaService,
    private toastr: ToastrService,
    private _errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this._categoriaService.getLista().subscribe(data => {
      this.Lista = data;
    })
  }

  Add(){
    // Validamos que el categoria ingrese valores
    if (this.nombre == '') {
        this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    
    // Creamos el objeto
    var categoria:  any = {
      id: (this.id== undefined)?0:this.id,
      nombre: this.nombre,
    }

    this.loading = true;
    if(this.id == undefined){
      this._categoriaService.save(categoria).subscribe({
        next: (v) => {
          this.loading = false;
          this.toastr.success(`La categoria ${this.nombre} fue registrado con exito`, 'Categoria registrada');
          this.resetForm();
          this.getList();
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          this._errorService.msjError(e);
        }
      })
    }else{
     
      this._categoriaService.update(this.id,categoria).subscribe({
        next: (v) => {
          this.loading = false;
          this.accion = 'Crear';
          this.toastr.success(`El Categoria ${this.nombre} fue Actualizada con exito`, 'Categoria actualizada');
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

  Update(categoria: Categoria){
    this.accion = 'Editar';
    this.id = categoria.id;
    this.nombre = categoria.nombre;
   }

   Delete(id: number){
    this.loading = true;
    this._categoriaService.delete(id).subscribe({
      next: (v) => {
        this.toastr.success(`El Categoria ${this.nombre} fue elimado con exito`, 'Categoria Eliminada');
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
  }
}
