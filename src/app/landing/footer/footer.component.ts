
import { Component } from '@angular/core';

declare global {
  interface Window {
    toggleSection: (id: string) => void;
  }
}

@Component({
  selector: 'app-footeruno',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']  // Corregido de 'styleUrl' a 'styleUrls'
})
export class FooterComponent {

  constructor() {
    // Asignar la función toggleSection al objeto global window
    window.toggleSection = (id: string) => {
      const section = document.getElementById(id);
      if (section) {
        section.classList.toggle('show');
      }
    };
  }
}