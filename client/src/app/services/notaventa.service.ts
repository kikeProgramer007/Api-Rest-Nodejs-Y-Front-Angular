import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notaventa } from '../interfaces/notaventa';

@Injectable({
  providedIn: 'root'
})
export class NotaventaService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;//http://localhost:3001/api/notaventas/
    this.myApiUrl = 'api/notaventas' //
  }

  getLista(): Observable<Notaventa[]> {
    return this.http.get<Notaventa[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  save(venta: any): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}`, venta)
  }

  update(id:number, venta:any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl +'/'+ id, venta); 
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl +'/'+ id)
  }
  VerPdfRango(fechas: any): Observable<any>{
    return this.http.post(`${this.myAppUrl}${this.myApiUrl}/VerPdfRango`, fechas, {
      responseType: 'blob' as 'json' // Indicar que esperamos un blob (archivo binario)
    });
  }
}
