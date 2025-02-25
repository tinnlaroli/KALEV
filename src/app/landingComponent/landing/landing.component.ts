import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

  constructor(private router: Router) {
  }
  loadlogin(){
    this.router.navigate(['/login']).then(() => {
    });
  }
  loadRegister(){
    this.router.navigate(['/register']).then(() => {
    });
  }
  scrollToSection(event: Event, sectionId: string) {
    event.preventDefault(); // Evita la recarga de la página
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
