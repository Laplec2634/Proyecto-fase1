import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a 
      *ngIf="mostrarBoton" 
      href="#top" 
      class="scroll-to-top"
      (click)="scrollToTop($event)">
    </a>
  `,
  styles: [`
    .scroll-to-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #f4a623, #f7c54d);
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      transition: all 0.3s ease;
      z-index: 1000;
      text-decoration: none;
    }

    .scroll-to-top:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.4);
    }

    .scroll-to-top::before {
      content: '↑';
      font-size: 24px;
      color: #fff;
      font-weight: bold;
    }

    @media (max-width: 480px) {
      .scroll-to-top {
        width: 42px;
        height: 42px;
        bottom: 20px;
        right: 20px;
      }

      .scroll-to-top::before {
        font-size: 20px;
      }
    }
  `]
})
export class ScrollToTopComponent {
  mostrarBoton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.mostrarBoton = window.pageYOffset > 300;
  }

  scrollToTop(event: Event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
