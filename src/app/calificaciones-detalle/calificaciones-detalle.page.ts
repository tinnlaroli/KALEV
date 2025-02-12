import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-calificaciones-detalle',
  templateUrl: './calificaciones-detalle.page.html',
  styleUrls: ['./calificaciones-detalle.page.scss'],
  standalone: false
})
export class CalificacionesDetallePage implements OnInit {
  alumno: any;
  calificaciones = [
    {
      actividad: 'Matemáticas',
      calificacion: 9.5,
      fecha: new Date('2025-02-10'),
    },
    {
      actividad: 'Ciencias',
      calificacion: 8.7,
      fecha: new Date('2025-02-12'),
    },
    {
      actividad: 'Historia',
      calificacion: 7.2,
      fecha: new Date('2025-02-15'),
    },
  ];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params["alumno"]) {  // Usando notación de corchetes
        try {
          this.alumno = JSON.parse(params["alumno"]);
        } catch (error) {
          console.error('Error al parsear los datos del alumno:', error);
        }
      } else {
        console.log('No se ha recibido el parámetro alumno');
      }
    });
  }

}
