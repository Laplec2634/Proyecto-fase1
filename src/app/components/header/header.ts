import { Component, OnInit, PLATFORM_ID, Inject, AfterViewInit, Renderer2 } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule, isPlatformBrowser, DOCUMENT } from '@angular/common';
import { filter } from 'rxjs/operators';

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
export class HeaderComponent implements OnInit, AfterViewInit {
  
  private translateLoaded = false;
  
  menuItems: MenuItem[] = [
    { label: 'Inicio', route: '/inicio' },
    { label: 'Menú', route: '/menu' },
    { label: 'Reserva', route: '/reserva' },
    { label: 'Sobre nosotros', route: '/sobre-nosotros' },
    { label: 'Contacto', route: '/contacto' }
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Limpiar el banner al iniciar
      this.removeBannerFrame();
      
      // Escuchar cambios de ruta
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe(() => {
        setTimeout(() => {
          this.removeBannerFrame();
          this.fixBodyPosition();
        }, 100);
      });
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.loadGoogleTranslate();
        this.removeBannerFrame();
        this.fixBodyPosition();
      }, 500);
    }
  }

  loadGoogleTranslate(): void {
    if (this.translateLoaded) {
      return;
    }

    const existingScript = this.document.querySelector('script[src*="translate.google.com"]');
    if (existingScript) {
      this.translateLoaded = true;
      this.removeBannerFrame();
      return;
    }

    window.googleTranslateElementInit = () => {
      try {
        if (window.google && window.google.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'es',
              includedLanguages: 'es,en,fr,it,de,pt',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
              multilanguagePage: true
            },
            'google_translate_element'
          );
          
          // Remover el banner después de inicializar
          setTimeout(() => {
            this.removeBannerFrame();
            this.fixBodyPosition();
          }, 1000);
        }
      } catch (error) {
        console.error('Error inicializando Google Translate:', error);
      }
    };

    const script = this.renderer.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      this.translateLoaded = true;
      setTimeout(() => this.removeBannerFrame(), 500);
    };

    this.renderer.appendChild(this.document.head, script);
  }

  private removeBannerFrame(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Remover el banner frame
    const bannerFrames = this.document.querySelectorAll('.goog-te-banner-frame, .skiptranslate iframe');
    bannerFrames.forEach(frame => {
      if (frame && frame.parentNode) {
        this.renderer.setStyle(frame, 'display', 'none');
        this.renderer.setStyle(frame, 'visibility', 'hidden');
        this.renderer.setStyle(frame, 'height', '0');
      }
    });

    // Ocultar el banner container
    const banner = this.document.querySelector('.goog-te-banner-frame');
    if (banner) {
      this.renderer.setStyle(banner, 'display', 'none');
    }

    this.fixBodyPosition();
  }

  private fixBodyPosition(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const body = this.document.body;
    const html = this.document.documentElement;
    
    // Forzar posición correcta
    this.renderer.setStyle(body, 'top', '0');
    this.renderer.setStyle(body, 'position', 'static');
    this.renderer.setStyle(html, 'margin-top', '0');
    
    // Remover clases de traducción que afectan el layout
    this.renderer.removeClass(body, 'translated-ltr');
    this.renderer.removeClass(body, 'translated-rtl');
  }
}