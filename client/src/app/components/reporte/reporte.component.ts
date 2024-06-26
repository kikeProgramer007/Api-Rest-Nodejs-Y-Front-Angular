import { Component, OnInit } from '@angular/core';
import { NotaventaService } from 'src/app/services/notaventa.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';
import { jwtDecode } from 'jwt-decode';
@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html'
})
export class ReporteComponent implements OnInit {
  fechaDesde: string= ''; // Formato YYYY-MM-DD
  fechaHasta: string= ''; // Formato YYYY-MM-DD
  private usuario:any = jwtDecode(localStorage.getItem('token')!)??'';
  constructor(
    private _notaVentaService : NotaventaService,
    private _errorService: ErrorService,
  ) { }

  ngOnInit(): void {
    const today = new Date();
    today.setDate(today.getDate());
    this.fechaDesde = today.toISOString().split('T')[0]; // formatea a 'yyyy-MM-dd'
    this.fechaHasta = today.toISOString().split('T')[0]; // formatea a 'yyyy-MM-dd'
  }
  generarReporte():void{
  var fechas: any = {
   usuario:  this.usuario.username,
   fecha_inicio: this.fechaDesde,
   fecha_fin:this.fechaHasta,
  }
    this._notaVentaService.VerPdfRango(fechas).subscribe({
      next: (data: Blob) => {
        const blob = new Blob([data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        
        // Calcular las dimensiones de la ventana
        const width = 800; // Ancho de la ventana
        const height = 600; // Alto de la ventana
        const left = (window.screen.width - width) / 2; // Calcular la posición izquierda para centrar
        const top = (window.screen.height - height) / 2; // Calcular la posición superior para centrar
        
        // Abrir el PDF en una nueva ventana centrada horizontalmente
        const newWindow = window.open(url, '_blank', `width=${width},height=${height},left=${left},top=${top}`);
        
        if (!newWindow) {
          // Controlar el caso en que el navegador bloquee la apertura de ventanas emergentes
          alert('Por favor, habilite las ventanas emergentes para ver el PDF.');
        }
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
      }
    })
  }
}
