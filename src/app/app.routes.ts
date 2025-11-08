import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio').then(m => m.InicioComponent)
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu').then(m => m.MenuComponent)
  },
  {
    path: 'reserva',
    loadComponent: () => import('./pages/reserva/reserva').then(m => m.ReservaComponent)
  },
  {
    path: 'sobre-nosotros',
    loadComponent: () => import('./pages/sobre-nosotros/sobre-nosotros').then(m => m.SobreNosotrosComponent)
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto').then(m => m.ContactoComponent)
  },
  {
    path: '**',
    redirectTo: 'inicio'
  }
]