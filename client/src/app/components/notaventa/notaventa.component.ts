import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { Detalleventatemporal } from 'src/app/interfaces/detalleventatemporal';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
declare var $: any; // Declara la variable global jQuery
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { jwtDecode } from 'jwt-decode';
import { Notaventa } from 'src/app/interfaces/notaventa';
import { NotaventaService } from 'src/app/services/notaventa.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';
import { lastValueFrom } from 'rxjs';
import { Detalleventa } from 'src/app/interfaces/detalleventa';
import { DetalleventaService } from 'src/app/services/detalleventa.service';

@Component({
  selector: 'app-notaventa',
  templateUrl: './notaventa.component.html'
})
export class NotaventaComponent implements OnInit {
  listProduct: Product[] = [];
  listCliente: Cliente[] = [];
  listDetalleTemp: Detalleventatemporal[] = [];

  id_producto:number = 0;
  nombreProducto:string = '';
  descripcion:string = '';
  precio:number = 0;
  stock:number=0;
  cantidad:number = 0;
  subtotal:number = 0;
  fecha:Date = new Date();

  isDisabled: boolean = true;

  total: number = 0;

  //Variable de detalle de venta
  id_venta: number = 0;
  tipopago:string='0'
  //Variables de cliente:
  codCliente :number=0;
  nombreCliente :string='';
  private usuario:any = jwtDecode(localStorage.getItem('token')!)??'';
  private intervalId: any;

  constructor(
    private _productService: ProductService,
    private _clienteService: ClienteService,
    private _ventaService: NotaventaService,
    private _detalleVentaService: DetalleventaService,
    private _errorService: ErrorService,
    private toastr: ToastrService,
    private sweetAlertService: SweetAlertService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getClientes();
    console.log(this.usuario)
      this.intervalId = setInterval(() => {
        this.fecha = new Date();
      }, 1000); // Actualizar cada segundo
    }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  toggleInput() {
    this.isDisabled = !this.isDisabled;
  }


  getProducts(): void {
    this._productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.listProduct = data;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }

  getClientes() {
    this._clienteService.getLista().subscribe(data => {
      this.listCliente = data;
    })
  }

  SeleccionarProducto(item: any){
    this.id_producto = item.id;
    this.nombreProducto = item.name;
    this.descripcion = item.description;
    this.precio = item.precio;
    this.subtotal = item.precio*1;
    this.stock = item.stock;
    this.cantidad = 1;
    this.isDisabled = false;
    this.closeModal() ;
  }
  
  SeleccionarCliente(item: any){
    this.codCliente = item.id;
    this.nombreCliente = item.nombre;
    this.closeModalCliente() ;
  }

  CalculaCantidadSubtotal() {
    // Lógica para calcular el subtotal basado en el código y la cantidad
    this.subtotal = this.precio*this.cantidad;
    this.subtotal = Number(this.subtotal.toFixed(2));
  }
  onInputChange(event: any): void {
    this.subtotal = this.precio*this.cantidad;
    this.subtotal = Number(this.subtotal.toFixed(2));
  }
  agregarItem() {
    if (this.id_producto !== 0 && this.stock >= this.cantidad) {
      const nroitem = this.listDetalleTemp.findIndex(item => item.id_producto === this.id_producto);
      if (nroitem !== -1) {
        const index = this.listDetalleTemp[nroitem];
        const EditarItem: Detalleventatemporal = {
          item: index.item,
          id_producto: index.id_producto,
          nombre: index.nombre,
          descripcion: index.descripcion,
          precio: index.precio,
          cantidad: index.cantidad + this.cantidad,
          subtotal: index.subtotal + this.subtotal
        };
  
        this.listDetalleTemp[nroitem] = EditarItem;
      } else {
        const nuevoItem: Detalleventatemporal = {
          item: this.listDetalleTemp.length + 1,
          id_producto: this.id_producto,
          nombre: this.nombreProducto,
          descripcion: this.descripcion,
          precio: this.precio,
          cantidad: this.cantidad,
          subtotal: this.subtotal
        };
  
        this.listDetalleTemp.push(nuevoItem);
      }
      const subtotal = Number((this.subtotal + this.total).toFixed(2));
      this.total = subtotal;
      this.resetFormProducto();
    } else if (this.stock < this.cantidad) {
      this.toastr.error(`La Cantidad excedió el stock`, `El stock actual es ${this.stock}`);
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
    $('#lista').modal('show');
  }

  // Método para cerrar el modal
  closeModal() {
    $('#lista').modal('hide');
  }

  openModalCliente() {
    $('#listCliente').modal('show');
  }

  // Método para cerrar el modal
  closeModalCliente() {
    $('#listCliente').modal('hide');
  }



  private resetFormProducto() {
    this.id_producto = 0;
    this.nombreProducto = '';
    this.descripcion = '';
    this.cantidad = 0;
    this.precio = 0;
    this.subtotal = 0;
  }

  private limpiartodo() {
    this.id_producto = 0;
    this.codCliente = 0;
    this.nombreCliente = '';
    this.nombreProducto = '';
    this.descripcion = '';
    this.cantidad = 0;
    this.precio = 0;
    this.subtotal = 0;
    this.id_venta = 0;
    this.listDetalleTemp = [];
  }

// MOSTRAR CONFIRMACION
 async  mostrarConfirmacion() {

  if (this.tipopago == '0') {
      this.toastr.error('Seleccione un tipo de pago', 'Error');
    return;
  }else if(this.codCliente == 0){
    this.toastr.error('Seleccione un Cliente', 'Error');
    return;
  }else if(this.listDetalleTemp.length == 0){
    this.toastr.error('Agregue un item de producto', 'Error');
    return;
  }
    this.sweetAlertService.mostrarConfirmacion('¿Estás seguro?', 'Esta acción no se puede deshacer.')
      .then((result) => {
        if (result.isConfirmed) {
           this.GuardarVenta();
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

  async GuardarVenta(){
    
    const venta: Notaventa = {
      fecha: new Date(),
      monto: this.total,
      estado: true,
      tipopago:this.tipopago,
      id_cliente: this.codCliente,
      id_usuario: this.usuario.id
    }
    console.log('Venta Nueva: ',venta)
     this._ventaService.save(venta).subscribe({
      next: (response:any) => {
        this.id_venta=response.Notaventa!.id;
        console.log( this.id_venta);

        for (var itemDet of this.listDetalleTemp!) {
           this.GuardarDetalleVenta(itemDet)
        }
  
        console.log('lista antes de guardar detalle',this.listDetalleTemp);

        this.getProducts();
        this.limpiartodo();
        this.toastr.success(`La venta fue exitosa`, 'Venta Registrada');
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      }
    })

    this.getProducts();

  }

  async GuardarDetalleVenta(detalleVenta: Detalleventatemporal) {
    var detVenta : Detalleventa = {
      id: 0 ,
      id_venta: this.id_venta,
      id_producto: detalleVenta.id_producto,
      cantidad: detalleVenta.cantidad,
      precio_v: detalleVenta.precio,
      subtotal:detalleVenta.subtotal
    }
    console.log('neuvo Detalle: ',detVenta)
    var stockActual : any={ stock:this.stock-detVenta.cantidad }
    await lastValueFrom(this._detalleVentaService.save(detVenta)) ;
    await lastValueFrom(this._productService.updateStock(detVenta.id_producto,stockActual)) ;
  }

}
