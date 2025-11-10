import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Mensaje {
  tipo: 'exito' | 'error' | 'procesando';
  texto: string;
}

interface InfoContacto {
  icono: string;
  titulo: string;
  descripcion: string;
}

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.css']
})
export class ContactoComponent implements OnInit {
  
  contactoForm!: FormGroup;
  mensaje: Mensaje | null = null;
  procesando: boolean = false;

  infoCards: InfoContacto[] = [
    {
      icono: 'email',
      titulo: 'Email',
      descripcion: 'Example@np.com'
    },
    {
      icono: 'phone',
      titulo: 'Teléfono',
      descripcion: '312456789'
    },
    {
      icono: 'location',
      titulo: 'Ubicación',
      descripcion: 'Bogotá, Colombia'
    }
  ];

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.crearFormulario();
  }

  crearFormulario(): void {
    this.contactoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      asunto: ['', [Validators.required, Validators.minLength(5)]],
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    this.mensaje = null;

    if (this.contactoForm.invalid) {
      this.marcarCamposComoTocados();
      this.mostrarMensajeError('Por favor completa todos los campos correctamente');
      return;
    }

    this.procesando = true;
    this.mensaje = {
      tipo: 'procesando',
      texto: '⏳ Enviando tu mensaje...'
    };

    setTimeout(() => {
      const exito = Math.random() > 0.1;

      if (exito) {
        this.procesando = false;
        this.mensaje = {
          tipo: 'exito',
          texto: `✅ ¡Mensaje enviado con éxito! Te responderemos pronto a ${this.contactoForm.value.correo}`
        };

        console.log('=== MENSAJE DE CONTACTO ===');
        console.log('Nombre:', this.contactoForm.value.nombre);
        console.log('Correo:', this.contactoForm.value.correo);
        console.log('Asunto:', this.contactoForm.value.asunto);
        console.log('Mensaje:', this.contactoForm.value.mensaje);
        console.log('Timestamp:', new Date().toISOString());
        console.log('===========================');

        setTimeout(() => {
          this.contactoForm.reset();
          this.mensaje = null;
        }, 4000);
      } else {
        this.procesando = false;
        this.mostrarMensajeError('❌ Error al enviar. Por favor, intenta nuevamente.');
      }
    }, 2000);
  }

  marcarCamposComoTocados(): void {
    Object.keys(this.contactoForm.controls).forEach(key => {
      this.contactoForm.get(key)?.markAsTouched();
    });
  }

  mostrarMensajeError(texto: string): void {
    this.mensaje = { tipo: 'error', texto };
    setTimeout(() => {
      this.mensaje = null;
    }, 5000);
  }

  get nombreInvalido(): boolean {
    const control = this.contactoForm.get('nombre');
    return !!(control?.invalid && control?.touched);
  }

  get correoInvalido(): boolean {
    const control = this.contactoForm.get('correo');
    return !!(control?.invalid && control?.touched);
  }

  get asuntoInvalido(): boolean {
    const control = this.contactoForm.get('asunto');
    return !!(control?.invalid && control?.touched);
  }

  get mensajeInvalido(): boolean {
    const control = this.contactoForm.get('mensaje');
    return !!(control?.invalid && control?.touched);
  }

  getSvgIcon(icono: string): SafeHtml {
  const iconos: { [key: string]: string } = {
    email: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
    </svg>`,
    phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24
      1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0
      .55-.45 1-1 1-9.39 0-17-7.61-17-17
      0-.55.45-1 1-1h3.5c.55 0 1 .45
      1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25
      1.02l-2.2 2.2z"/>
    </svg>`,
    location: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0
      5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0
      9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5
      2.5-2.5 2.5 1.12 2.5 2.5-1.12
      2.5-2.5 2.5z"/>
    </svg>`
  };

  return this.sanitizer.bypassSecurityTrustHtml(iconos[icono] || '');
}
}