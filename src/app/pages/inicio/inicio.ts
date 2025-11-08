import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Plato {
  nombre: string;
  imagen: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent {
  
  tabActiva: string = 'tendencias';

  tendencias: Plato[] = [
    {
      nombre: 'Sudado de carne',
      imagen: 'assets/images/Plato1-carne-sudado.jpg'
    },
    {
      nombre: 'Ajiaco Santafereño',
      imagen: 'assets/images/Palto1-sopa-ajiaco-santafereno.jpg'
    },
    {
      nombre: 'Calentado con frijoles',
      imagen: 'assets/images/Plato3-Desayuno-calentado-frijoles.jpg'
    },
    {
      nombre: 'Picada Paisa',
      imagen: 'assets/images/Plato4-picada-paisa.jpg'
    }
  ];

  nuevosPlatos: Plato[] = [
    {
      nombre: 'Empanadas',
      imagen: 'assets/images/Plato2-Almuerzo-empanadas.jpg'
    },
    {
      nombre: 'Limonada de coco',
      imagen: 'assets/images/Bebidas3-limonada-coco.jpg'
    },
    {
      nombre: 'Picada mixta',
      imagen: 'assets/images/Plato1-picada-mixta.jpg'
    },
    {
      nombre: 'Arroz con pollo',
      imagen: 'assets/images/Plato3-Almuerzo-arroz-pollo.jpg'
    }
  ];

  menuDia: Plato[] = [
    {
      nombre: 'Calentado de huevo',
      imagen: 'assets/images/Plato1-Desayuno-calentado-huevo.jpg'
    },
    {
      nombre: 'Carne al bistec',
      imagen: 'assets/images/Plato2-carne-bistec.jpg'
    },
    {
      nombre: 'Picada campesina',
      imagen: 'assets/images/Plato2-picada-campesina.jpg'
    },
    {
      nombre: 'Costilla BBQ',
      imagen: 'assets/images/Plato3-carne-Costillas-BBQ.jpg'
    }
  ];

  cambiarTab(tab: string): void {
    this.tabActiva = tab;
  }
}