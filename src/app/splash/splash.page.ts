// Se importa el componente y la interfaz OnInit de Angular
import { Component, OnInit } from '@angular/core';
// Se importa el Router de Angular para navegar entre rutas
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',  // Define el nombre del selector del componente que se usará en la plantilla
  templateUrl: './splash.page.html',  // Define la ruta del archivo HTML asociado con este componente
  styleUrls: ['./splash.page.scss'],  // Define la ruta del archivo de estilos (CSS/SCSS) asociado con este componente
  standalone: false  // Define si el componente es parte de un módulo o independiente
})
// Declaración de la clase SplashPage que implementa OnInit para usar el ciclo de vida de Angular
export class SplashPage implements OnInit {

  // El constructor recibe el servicio Router, que se inyecta para permitir la navegación
  constructor(private router: Router) {}

  // ngOnInit se ejecuta al inicializar el componente
  ngOnInit() {
    // Usamos setTimeout para simular un retraso (en este caso 3000 ms = 3 segundos)
    setTimeout(() => {
      // Redirige a la ruta '/login' después de 3 segundos
      this.router.navigate(['/login']); // Redirige al login después del splash
    }, 3000); // Espera 3 segundos antes de redirigir
  }
}
