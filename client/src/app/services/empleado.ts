import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleado } from '../interfaces/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/empleados'
  }

  getLista(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.myAppUrl}${this.myApiUrl}`)
  }

  buscar(id: number): Observable<Empleado> {
    return this.http.get<Empleado>(`${this.myAppUrl}${this.myApiUrl}` +'/'+ id)
  }

  save(empleado: Empleado): Observable<string> {
    return this.http.post<string>(`${this.myAppUrl}${this.myApiUrl}`, empleado)
  }

  update(id:number, empleado:any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl +'/'+ id, empleado); 
  }

  delete(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl +'/'+ id)
  }
}
