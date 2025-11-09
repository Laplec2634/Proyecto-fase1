import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.html',
  styleUrls: ['./menu.css']
})
export class MenuComponent implements OnInit {
  
  platos: Plato[] = [];
  platosFiltrados: Plato[] = [];
  categoriaActiva: string = 'todos';
  
  categorias = [
    { id: 'todos', nombre: 'Todos' },
    { id: 'almuerzo', nombre: 'Almuerzo' },
    { id: 'desayuno', nombre: 'Desayuno' },
    { id: 'sopas', nombre: 'Sopas' },
    { id: 'picadas', nombre: 'Picadas' },
    { id: 'carne', nombre: 'Carne' },
    { id: 'bebidas', nombre: 'Bebidas' }
  ];

  ngOnInit(): void {
    this.cargarPlatos();
  }

  cargarPlatos(): void {
    this.platos = [
      {
        id: 1,
        nombre: 'Bandeja Paisa',
        descripcion: 'Plato típico colombiano con frijoles, arroz, carne molida, chicharrón, huevo, aguacate y arepa.',
        precio: 25000,
        categoria: 'almuerzo',
        imagen: 'assets/images/Plato1-Almuerzo-Bandeja-Paisa.jpg'
      },
      {
        id: 2,
        nombre: 'Calentado con Huevo',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'desayuno',
        imagen: 'assets/images/Plato1-Desayuno-calentado-huevo.jpg'
      },
      {
        id: 3,
        nombre: 'Costillas BBQ',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'carne',
        imagen: 'assets/images/Plato3-carne-Costillas-BBQ.jpg'
      },
      {
        id: 4,
        nombre: 'Empanadas',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'almuerzo',
        imagen: 'assets/images/Plato2-Almuerzo-empanadas.jpg'
      },
      {
        id: 5,
        nombre: 'Picada Mixta',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'picadas',
        imagen: 'assets/images/Plato1-picada-mixta.jpg'
      },
      {
        id: 6,
        nombre: 'Jugo Limonada',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'bebidas',
        imagen: 'assets/images/Bebidas2-limonada.jpg'
      },
      {
        id: 7,
        nombre: 'Picada campesina',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'picadas',
        imagen: 'assets/images/Plato2-picada-campesina.jpg'
      },
      {
        id: 8,
        nombre: 'Picada costeña',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'picadas',
        imagen: 'assets/images/Plato3-picada-costeña.jpg'
      },
      {
        id: 9,
        nombre: 'Picada Paisa',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'picadas',
        imagen: 'assets/images/Plato4-picada-paisa.jpg'
      },
      {
        id: 10,
        nombre: 'Ajiaco santafereño',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'sopas',
        imagen: 'assets/images/Palto1-sopa-ajiaco-santafereno.jpg'
      },
      {
        id: 11,
        nombre: 'Sancocho',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'sopas',
        imagen: 'assets/images/Plato2-sopa-sancocho-colombiano.jpg'
      },
      {
        id: 12,
        nombre: 'Mondongo',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'sopas',
        imagen: 'assets/images/Palto3-sopa-mondongo-colombiano.jpg'
      },
      {
        id: 13,
        nombre: 'Changua',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'sopas',
        imagen: 'assets/images/Plato4-sopa-Changua-Colombiana.jpg'
      },
      {
        id: 14,
        nombre: 'Jugo Natural mora',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'bebidas',
        imagen: 'assets/images/Bebidas1-Jugo-Mora.jpg'
      },
      {
        id: 15,
        nombre: 'Jugo Natural Naraja',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'bebidas',
        imagen: 'assets/images/Bebidas4-jugo-naranja.jpg'
      },
      {
        id: 16,
        nombre: 'Jugo limonada de coco',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'bebidas',
        imagen: 'assets/images/Bebidas3-limonada-coco.jpg'
      },
      {
        id: 17,
        nombre: 'Sudado de carne',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'carne',
        imagen: 'assets/images/Plato1-carne-sudado.jpg'
      },
      {
        id: 18,
        nombre: 'Arroz con pollo',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'almuerzo',
        imagen: 'assets/images/Plato3-Almuerzo-arroz-pollo.jpg'
      },
      {
        id: 19,
        nombre: 'Arroz atollado',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'almuerzo',
        imagen: 'assets/images/Plato4-Almuerzo-Arroz-atollado.jpg'
      },
      {
        id: 20,
        nombre: 'Carne al bistec',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'carne',
        imagen: 'assets/images/Plato2-carne-bistec.jpg'
      },
      {
        id: 21,
        nombre: 'Carne guisado',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'carne',
        imagen: 'assets/images/Plato4-carne-guisado.jpg'
      },
      {
        id: 22,
        nombre: 'Calentado con frijoles',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'desayuno',
        imagen: 'assets/images/Plato3-Desayuno-calentado-frijoles.jpg'
      },
      {
        id: 23,
        nombre: 'Tamales',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'desayuno',
        imagen: 'assets/images/Plato2-Desayuno-Tamales.jpg'
      },
      {
        id: 24,
        nombre: 'Arepas de huevo',
        descripcion: 'Delicioso desayuno con arroz, frijoles, carne y huevo frito.',
        precio: 12000,
        categoria: 'desayuno',
        imagen: '/assets/images/Plato4-Desayunoarepas_huevo.jpg'
      }
      // Agrega más platos aquí
    ];
    this.platosFiltrados = this.platos;
  }

  filtrarPorCategoria(categoria: string): void {
    this.categoriaActiva = categoria;
    
    if (categoria === 'todos') {
      this.platosFiltrados = this.platos;
    } else {
      this.platosFiltrados = this.platos.filter(
        plato => plato.categoria === categoria
      );
    }
  }

  toggleFlip(event: Event): void {
    const card = (event.currentTarget as HTMLElement).querySelector('.card-inner');
    if (card) {
      card.classList.toggle('flipped');
    }
  }
}