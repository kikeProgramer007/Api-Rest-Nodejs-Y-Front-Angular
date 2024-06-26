import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from 'src/app/interfaces/empleado';
import { EmpleadoService } from 'src/app/services/empleado';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html'
})
export class CrearEditarComponent implements OnInit {
  form: FormGroup<any>;
  loading: boolean = false;
  id: number = 0;
  operacion: string = 'Agregar ';

  constructor(
    private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
    private router: Router,
    private toastr: ToastrService,
    private aRouter: ActivatedRoute
  ){
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      telefono: ['',[   , Validators.pattern('^\\+?[1-9]\\d{1,14}$'),Validators.required]],
      direccion: [null, Validators.required],
      correo: [null, Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    if (this.id != 0) {
      // Es editar
      this.operacion = 'Editar ';
      this.Buscar(this.id);
    }
  }

  Buscar(id: number) {
    this.loading = true;
    this._empleadoService.buscar(id).subscribe((data:Empleado) => {
      this.loading = false;
      this.form.setValue({
        nombre: data.nombre,
        telefono: data.telefono,
        direccion: data.direccion,
        correo: data.correo
      })
    })
  }

  Save() {
    const empleado: Empleado = {
      nombre: this.form.value.nombre,
      telefono: this.form.value.telefono,
      direccion: this.form.value.direccion,
      correo: this.form.value.correo
    }

    this.loading = true;

    if (this.id !== 0) {
      // Es editar 
      empleado.id = this.id;
      this._empleadoService.update(this.id, empleado).subscribe(() => {
        this.toastr.info(`El empleado ${empleado.nombre} fue actualizado con exito`, 'Empleado actualizado');
        this.loading = false;
        this.router.navigate(['/empleado']);
      })

    } else {
      // Es agregar
      this._empleadoService.save(empleado).subscribe(() => {
        this.toastr.success(`El empleado ${empleado.nombre} fue registrado con exito`, 'Empleado registrado');
        this.loading = false;
        this.router.navigate(['/empleado']);
      })
    }
  }

}
