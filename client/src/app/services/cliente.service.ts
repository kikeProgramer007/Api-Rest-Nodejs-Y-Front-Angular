import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../interfaces/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/clientes'
  }

  getLista(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  save(cliente: Cliente): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}`, cliente)
  }

  update(id:number, cliente:any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl +'/'+ id, cliente); 
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl +'/'+ id)
  }
}
