import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html'
})
export class ListarComponent implements OnInit {

  Lista: Empleado[] = []
  loading: boolean = false;

  constructor(
    private _empleadoService: EmpleadoService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this.GetList()
  }

  GetList() {
    this.loading = true;

    this._empleadoService.getLista().subscribe((data: Empleado[]) => {
      this.Lista = data;
      this.loading = false;
    })
  }

  Delete(id: number) {
    this.loading = true;
    this._empleadoService.delete(id).subscribe(() => {
      this.GetList();
      this.toastr.error(`El Registro fue elimado con exito`, 'Empleado Eliminado');
    })
  }

}
