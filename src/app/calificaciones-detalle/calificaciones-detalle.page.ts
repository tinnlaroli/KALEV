import { Component, OnInit } from '@angular/core';  // Importa el decorador Component y la interfaz OnInit
import { ActivatedRoute } from '@angular/router';  // Importa ActivatedRoute para manejar los parámetros de la ruta

@Component({
  selector: 'app-calificaciones-detalle',  // Define el selector de la página, utilizado para integrarla en el HTML.
  templateUrl: './calificaciones-detalle.page.html',  // Ruta al archivo HTML que define la vista de la página.
  styleUrls: ['./calificaciones-detalle.page.scss'],  // Ruta al archivo de estilos SCSS para la página.
  standalone: false  // Define que este componente no es independiente, depende de otros componentes o módulos.
})
export class CalificacionesDetallePage implements OnInit {
  alumno: any;  // Variable para almacenar los datos del alumno, que se recibirán como parámetro.
  
  // Array que contiene las calificaciones y detalles de las actividades.
  calificaciones = [
    {
      actividad: 'Matemáticas',  // Nombre de la actividad.
      calificacion: 9.5,  // Calificación obtenida por el alumno.
      fecha: new Date('2025-02-10'),  // Fecha en la que se registró la calificación.
    },
    {
      actividad: 'Ciencias',  // Nombre de la actividad.
      calificacion: 8.7,  // Calificación obtenida por el alumno.
      fecha: new Date('2025-02-12'),  // Fecha en la que se registró la calificación.
    },
    {
      actividad: 'Historia',  // Nombre de la actividad.
      calificacion: 7.2,  // Calificación obtenida por el alumno.
      fecha: new Date('2025-02-15'),  // Fecha en la que se registró la calificación.
    },
  ];

  // Constructor donde se inyecta ActivatedRoute para acceder a los parámetros de la ruta.
  constructor(private route: ActivatedRoute) { }

  // Método que se ejecuta al inicializar el componente.
  ngOnInit() {
    // Suscripción a los parámetros de la ruta para obtener datos pasados como queryParams.
    this.route.queryParams.subscribe(params => {
      // Verifica si existe el parámetro "alumno" en la ruta.
      if (params && params["alumno"]) {  // Usando notación de corchetes para acceder al parámetro.
        try {
          // Intenta parsear el valor del parámetro "alumno" y asignarlo a la variable alumno.
          this.alumno = JSON.parse(params["alumno"]);
        } catch (error) {
          // Si ocurre un error al parsear, lo muestra en la consola.
          console.error('Error al parsear los datos del alumno:', error);
        }
      } else {
        // Si no se recibe el parámetro "alumno", muestra un mensaje en la consola.
        console.log('No se ha recibido el parámetro alumno');
      }
    });
  }
}