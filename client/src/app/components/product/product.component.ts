import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  listProduct: Product[] = []
  accion = 'Agregar';
  id: number | undefined;

  name: string = '';
  description: string = '';
  loading: boolean = false;



  //Contructor
  constructor(
    private _productService: ProductService,
    private toastr: ToastrService,
    private _errorService: ErrorService
  ) { 
 
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.listProduct = data;
    })
  }

  addProduct(){
    // Validamos que el usuario ingrese valores
    if (this.name == '' || this.description == '') {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    
    // Creamos el objeto
    var product:  any = {
      id: (this.id== undefined)?0:this.id,
      name: this.name,
      description: this.description
    }

    this.loading = true;
    if(this.id == undefined){
      this._productService.saveProduct(product).subscribe({
        next: (v) => {
          this.loading = false;
          this.toastr.success(`El usuario ${this.name} fue registrado con exito`, 'Usuario registrado');
          this.resetForm();
          this.getProducts();
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          this._errorService.msjError(e);
        }
      })
    }else{
     
      this._productService.updateProduct(this.id,product).subscribe({
        next: (v) => {
          this.loading = false;
          this.accion = 'Agregar';
          this.toastr.success(`El Producto ${this.name} fue Actualizado con exito`, 'Producto actualizado');
          this.resetForm();
          this.getProducts();
        },
        error: (e: HttpErrorResponse) => {
          this.loading = false;
          this._errorService.msjError(e);
        }
      })


    }

  }

  UpdateProduct(product: Product){
    this.accion = 'Editar';
    this.id = product.id;
    this.name = product.name,
    this.description = product.description
   }

   DeleteProduct(id: number){
    this.loading = true;
    this._productService.deleteProduct(id).subscribe({
      next: (v) => {
        this.toastr.success(`El Producto ${this.name} fue elimado con exito`, 'Producto Eliminado');
        this.getProducts();
      },
      error: (e: HttpErrorResponse) => {
        this.loading = false;
        this._errorService.msjError(e);
      }
    })


  }

   private resetForm() {
    this.name = '';
    this.description = '';
    this.id = undefined;
  }
}
