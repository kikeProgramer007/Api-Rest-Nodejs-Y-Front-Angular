import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  mostrarMensaje(titulo: string, mensaje: string, tipo: 'success' | 'error' | 'warning' | 'info' = 'success') {
    Swal.fire(titulo, mensaje, tipo);
  }

  mostrarConfirmacion(titulo: string, mensaje: string) {
    return Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    });
  }

}

