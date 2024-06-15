import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/products'
  }

  getProducts(): Observable<Product[]> {
    /*  const token = localStorage.getItem('token')
     const headers = new HttpHeaders().set('Authorization',`Bearer ${token}`) */
    /*     return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`, { headers: headers } ) */
    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  saveProduct(product: Product): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}`, product)
  }

  updateProduct(id:number, product:any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl +'/'+ id, product); 
  }

  deleteProduct(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl +'/'+ id)
  }

  updateStock(id:number, product:any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl +'/stock/'+ id, product); 
  }
}
