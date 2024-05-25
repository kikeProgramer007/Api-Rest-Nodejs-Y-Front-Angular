import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/categorias'
  }

  getLista(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  save(categoria: Categoria): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}`, categoria)
  }

  update(id:number, categoria:any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl +'/'+ id, categoria); 
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl +'/'+ id)
  }
}
