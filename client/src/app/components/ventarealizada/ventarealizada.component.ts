import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Detalleventa } from 'src/app/interfaces/detalleventa';
import { Notaventa } from 'src/app/interfaces/notaventa';
import { DetalleventaService } from 'src/app/services/detalleventa.service';
import { ErrorService } from 'src/app/services/error.service';
import { NotaventaService } from 'src/app/services/notaventa.service';

@Component({
  selector: 'app-ventarealizada',
  templateUrl: './ventarealizada.component.html'
})
export class VentarealizadaComponent implements OnInit {
  loading: boolean = false;
  Lista: Notaventa[] = []
  
  constructor(
    private _ventaRealizadas: NotaventaService,
    private _errorService: ErrorService,
    private _detalleVenta: DetalleventaService
  ) { }

  ngOnInit(): void {
    this.GetList()
  }

  GetList() {
    this.loading = true;

    this._ventaRealizadas.getLista().subscribe((data: Notaventa[]) => {
      this.Lista = data;
      this.loading = false;
    })
  }
  VerPDF(id:number):void{
    
    this._detalleVenta.VerPdf(id).subscribe({
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
        this.loading = false;
        this._errorService.msjError(e);
      }
    })
  }

}
