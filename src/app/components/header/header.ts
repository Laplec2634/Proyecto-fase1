import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface MenuItem {
  label: string;
  route: string;
}

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent implements OnInit {
  
  menuItems: MenuItem[] = [
    { label: 'Inicio', route: '/inicio' },
    { label: 'Menú', route: '/menu' },
    { label: 'Reserva', route: '/reserva' },
    { label: 'Sobre nosotros', route: '/sobre-nosotros' },
    { label: 'Contacto', route: '/contacto' }
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Solo ejecutar en el navegador (no en SSR)
    if (isPlatformBrowser(this.platformId)) {
      this.loadGoogleTranslate();
    }
  }

  loadGoogleTranslate(): void {
    // Definir la función de inicialización
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'es',
        includedLanguages: 'en,fr,it,de,pt',
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      }, 'google_translate_element');
    };

    // Cargar el script de Google Translate
    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
  }
}