import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { ErrorService } from 'src/app/services/error.service';
import { Categoria } from 'src/app/interfaces/categoria';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  listProduct: Product[] = []
  listCategoria: Categoria[] = []
  accion = 'Agregar';
  id: number | undefined;

  name: string = '';
  description: string = '';
  loading: boolean = false;
  id_categoria: number = 0;
  precio: number | undefined ;
  stock: number | undefined ;

  //Contructor
  constructor(
    private _categoriaService: CategoriaService,
    private _productService: ProductService,
    private toastr: ToastrService,
    private _errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategorias();
  }

  getProducts() {
    this._productService.getProducts().subscribe(data => {
      this.listProduct = data;
    })
  }

  getCategorias(){
    this._categoriaService.getLista().subscribe(data => {
      this.listCategoria = data;
    })
  }

  addProduct(){
    // Validamos que el usuario ingrese valores
    if (this.name == '' || this.description == ''|| this.precio == 0 || this.precio == undefined || this.stock == 0||this.stock == undefined ||  this.id_categoria == 0) {
      this.toastr.error('Todos los campos son obligatorios', 'Error');
      return;
    }
    
    // Creamos el objeto
    var product:  any = {
      id: (this.id== undefined)?0:this.id,
      name: this.name,
      description: this.description,
      precio: this.precio,
      stock: this.stock,
      id_categoria: this.id_categoria
    }

    this.loading = true;
    if(this.id == undefined){
      this._productService.saveProduct(product).subscribe({
        next: (v) => {
          this.loading = false;
          this.toastr.success(`El producto ${this.name} fue registrado con exito`, 'Producto registrado');
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
    this.description = product.description,
    this.precio= product.precio,
    this.stock= product.stock,
    this.id_categoria = Number(product.id_categoria)
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
    this.id = undefined;
    this.name = '';
    this.description = '';
    this.precio = undefined;
    this.stock = undefined;
    this.id_categoria = 0;
  }
}
