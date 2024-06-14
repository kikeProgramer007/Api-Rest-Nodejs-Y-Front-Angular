import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { Detalleventatemporal } from 'src/app/interfaces/detalleventatemporal';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';
declare var $: any; // Declara la variable global jQuery

@Component({
  selector: 'app-notaventa',
  templateUrl: './notaventa.component.html',
  styleUrls: ['./notaventa.component.css']
})
export class NotaventaComponent implements OnInit {
  listProduct: Product[] = [];
  listDetalleTemp: Detalleventatemporal[] = [];

  id:number = 0;
  nombreProducto:string = '';
  descripcion:string = '';
  precio:number = 0;
  cantidad:number = 0;
  subtotal:number = 0;
  isDisabled: boolean = true;

  total: number = 0;

  constructor(
    private _productService: ProductService,
    private sweetAlertService: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }


  toggleInput() {
    this.isDisabled = !this.isDisabled;
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.listProduct = data;
    })
  }

  SeleccionarProducto(item: any){
    this.id = item.id;
    this.nombreProducto = item.name;
    this.descripcion = item.description;
    this.precio = item.precio;
    this.subtotal = item.precio*1;
    this.cantidad = 1;
    this.isDisabled = false;
    this.closeModal() ;
  }

  CalculaCantidadSubtotal() {
    // Lógica para calcular el subtotal basado en el código y la cantidad
    this.subtotal = this.precio*this.cantidad;
    this.subtotal = Number(this.subtotal.toFixed(2));
  }

  agregarItem() {
    if(this.id!=0){
      const nuevoItem: Detalleventatemporal = {
        item: this.listDetalleTemp.length + 1, // o cualquier lógica para determinar el número de ítem
        nombre: this.nombreProducto,
        descripcion: this.descripcion,
        precio: this.precio,
        cantidad: this.cantidad,
        subtotal: this.subtotal
      };

      this.listDetalleTemp.push(nuevoItem);
      this.total = this.subtotal + this.total;
      this.total = Number(this.total.toFixed(2));
      console.log('Item agregado:', nuevoItem);
      this.resetForm();
    }
  }

  eliminaProducto(item: Detalleventatemporal){
    // this.listDetalleTemp = this.listDetalleTemp.filter(i => i !== item);
    const index = this.listDetalleTemp.indexOf(item);
    console.log('Item eliminado:', item);
    if (index > -1) {
      this.listDetalleTemp.splice(index, 1);
      this.actualizarContadorItems();
      this.total = this.total - item.subtotal;
      this.total = Number(this.total.toFixed(2));
      console.log('Item eliminado:', item);
    } else {
      console.log('Item no encontrado:', item);
    }

  }

  actualizarContadorItems() {
    this.listDetalleTemp.forEach((item, index) => {
      item.item = index + 1;
    });
  }

  // Método para abrir el modal
  openModal() {
    $('#myModal').modal('show');
  }

  // Método para cerrar el modal
  closeModal() {
    $('#lista').modal('hide');
  }


  private resetForm() {
    this.id = 0;
    this.nombreProducto = '';
    this.descripcion = '';
    this.cantidad = 0;
    this.precio = 0;
    this.subtotal = 0;
  }


// MOSTRAR CONFIRMACION
  mostrarConfirmacion() {
    this.sweetAlertService.mostrarConfirmacion('¿Estás seguro?', 'Esta acción no se puede deshacer.')
      .then((result) => {
        if (result.isConfirmed) {
          // Aquí va la lógica si se confirma la acción
          this.sweetAlertService.mostrarMensaje('Confirmado', 'La acción ha sido confirmada.', 'success');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          this.sweetAlertService.mostrarMensaje('Cancelado', 'La acción ha sido cancelada.', 'error');
        }
      });
  }
  mostrarAlerta() {
    this.sweetAlertService.mostrarMensaje('¡Éxito!', 'Operación completada con éxito.', 'success');
  }

}
