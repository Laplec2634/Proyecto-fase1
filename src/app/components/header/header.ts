import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface MenuItem {
  label: string;
  route: string;
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
export class HeaderComponent {
  menuItems: MenuItem[] = [
    { label: 'Inicio', route: '/inicio' },
    { label: 'Menú', route: '/menu' },
    { label: 'Reserva', route: '/reserva' },
    { label: 'Sobre nosotros', route: '/sobre-nosotros' },
    { label: 'Contacto', route: '/contacto' }
  ];
}