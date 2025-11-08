import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Mensaje {
  tipo: 'exito' | 'error' | 'procesando';
  texto: string;
}

@Component({
  selector: 'app-reserva',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './reserva.html',
  styleUrls: ['./reserva.css']
})
export class ReservaComponent implements OnInit {
  
  reservaForm!: FormGroup;
  mensaje: Mensaje | null = null;
  procesando: boolean = false;
  fechaMinima: string;

  constructor(private fb: FormBuilder) {
    const hoy = new Date();
    this.fechaMinima = hoy.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(): void {
    this.reservaForm = this.fb.group({
      fechaEntrada: ['', [Validators.required]],
      fechaSalida: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    }, {
      validators: this.validarFechas
    });

    this.reservaForm.get('fechaEntrada')?.valueChanges.subscribe(fecha => {
      if (fecha) {
        const control = this.reservaForm.get('fechaSalida');
        if (control?.value && control.value < fecha) {
          control.setValue('');
        }
      }
    });
  }

  validarFechas(group: FormGroup) {
    const entrada = group.get('fechaEntrada')?.value;
    const salida = group.get('fechaSalida')?.value;

    if (entrada && salida) {
      const fechaEntrada = new Date(entrada);
      const fechaSalida = new Date(salida);

      if (fechaSalida <= fechaEntrada) {
        return { fechasInvalidas: true };
      }
    }
    return null;
  }

  get fechaSalidaMinima(): string {
    const entrada = this.reservaForm.get('fechaEntrada')?.value;
    return entrada || this.fechaMinima;
  }

  onSubmit(): void {
    this.mensaje = null;

    if (this.reservaForm.invalid) {
      this.marcarCamposComoTocados();
      
      if (this.reservaForm.errors?.['fechasInvalidas']) {
        this.mostrarMensajeError('La fecha de salida debe ser posterior a la fecha de entrada');
      } else {
        this.mostrarMensajeError('Por favor completa todos los campos correctamente');
      }
      return;
    }

    this.procesando = true;
    this.mensaje = {
      tipo: 'procesando',
      texto: '⏳ Procesando tu reserva...'
    };

    setTimeout(() => {
      const exito = Math.random() > 0.1;

      if (exito) {
        this.procesando = false;
        this.mensaje = {
          tipo: 'exito',
          texto: `✅ ¡Reserva confirmada! Hemos enviado los detalles a ${this.reservaForm.value.email}`
        };

        console.log('=== DATOS ENVIADOS AL SERVIDOR ===');
        console.log('Fecha de entrada:', this.reservaForm.value.fechaEntrada);
        console.log('Fecha de salida:', this.reservaForm.value.fechaSalida);
        console.log('Email:', this.reservaForm.value.email);
        console.log('Timestamp:', new Date().toISOString());
        console.log('===================================');

        setTimeout(() => {
          this.reservaForm.reset();
          this.mensaje = null;
        }, 4000);
      } else {
        this.procesando = false;
        this.mostrarMensajeError('❌ Error del servidor. Por favor, intenta nuevamente más tarde.');
      }
    }, 2000);
  }

  marcarCamposComoTocados(): void {
    Object.keys(this.reservaForm.controls).forEach(key => {
      this.reservaForm.get(key)?.markAsTouched();
    });
  }

  mostrarMensajeError(texto: string): void {
    this.mensaje = { tipo: 'error', texto };
    setTimeout(() => {
      this.mensaje = null;
    }, 5000);
  }

  get fechaEntradaInvalida(): boolean {
    const control = this.reservaForm.get('fechaEntrada');
    return !!(control?.invalid && control?.touched);
  }

  get fechaSalidaInvalida(): boolean {
    const control = this.reservaForm.get('fechaSalida');
    const formInvalid = this.reservaForm.errors?.['fechasInvalidas'];
    return !!(control?.invalid && control?.touched) || !!formInvalid;
  }

  get emailInvalido(): boolean {
    const control = this.reservaForm.get('email');
    return !!(control?.invalid && control?.touched);
  }
}
