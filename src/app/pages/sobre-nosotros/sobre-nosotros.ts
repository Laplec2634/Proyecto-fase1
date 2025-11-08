import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  nombre: string;
  imagen: string;
  cargo?: string;
}

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre-nosotros.html',
  styleUrls: ['./sobre-nosotros.css']
})
export class SobreNosotrosComponent {
  
  teamMembers: TeamMember[] = [
    {
      nombre: 'Sebastian Rojas Molina',
      imagen: 'assets/images/Autor1.jpg',
      cargo: 'Chef Principal'
    },
    {
      nombre: 'Oscar David Chamorro Anzola',
      imagen: 'assets/images/Autor2.jpg',
      cargo: 'Gerente'
    }
  ];
}