import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Detalleventa } from '../interfaces/detalleventa';

@Injectable({
  providedIn: 'root'
})
export class DetalleventaService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/detalleventas'
  }

  getLista(): Observable<Detalleventa[]> {
    return this.http.get<Detalleventa[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  save(detalleventa: Detalleventa): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}`, detalleventa)
  }

  update(id:number, detalleventa:any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl +'/'+ id, detalleventa); 
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl +'/'+ id)
  }

  VerPdf(id: number): Observable<any>{
    return this.http.get(`${this.myAppUrl}${this.myApiUrl}/pdf/${id}`, {
      responseType: 'blob' as 'json' // Indicar que esperamos un blob (archivo binario)
    });
  }

}
