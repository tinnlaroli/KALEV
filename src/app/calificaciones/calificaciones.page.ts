import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

/**
 * @description Componente que muestra la lista de alumnos y permite ver sus calificaciones.
 */
@Component({
  selector: 'app-calificaciones',
  templateUrl: './calificaciones.page.html',
  styleUrls: ['./calificaciones.page.scss'],
  standalone: false 
})
export class CalificacionesPage implements OnInit {

  /**
   * @description Lista de alumnos con sus datos personales y su estilo de aprendizaje.
   */
  alumnos = [
    { nombre: 'Juan Pérez López', grado: 'Primer Grado', grupo: 'A', tipoAprendizaje: 'Visual' },
    { nombre: 'María Gómez Martínez', grado: 'Primer Grado', grupo: 'B', tipoAprendizaje: 'Kinestésico' },
    { nombre: 'Carlos Barrera Montero', grado: 'Primer Grado', grupo: 'A', tipoAprendizaje: 'Auditivo' },
    { nombre: 'Laura María Cruz Pérez', grado: 'Primer Grado', grupo: 'A', tipoAprendizaje: 'Lecto-escritura' },
    { nombre: 'Pedro Rodríguez Aponte', grado: 'Cuarto Grado', grupo: 'B', tipoAprendizaje: 'Visual' },
    { nombre: 'Ana Sánchez Sánchez', grado: 'Cuarto Grado', grupo: 'A', tipoAprendizaje: 'Kinestésico' },
    { nombre: 'José García González', grado: 'Cuarto Grado', grupo: 'B', tipoAprendizaje: 'Auditivo' },
    { nombre: 'Sofía Hernández Alonso', grado: 'Cuarto Grado', grupo: 'B', tipoAprendizaje: 'Lecto-escritura' },
    { nombre: 'Concepción Lara Bazán', grado: 'Cuarto Grado', grupo: 'A', tipoAprendizaje: 'Lecto-escritura' }
  ];

  /**
   * @constructor
   * @param {NavController} navCtrl - Servicio de navegación de Ionic para manejar el cambio de páginas.
   */
  constructor(private navCtrl: NavController) { }

  /**
   * @description Redirige a la página de detalle de calificaciones con los datos del alumno seleccionado.
   * @param {any} alumno - Objeto que representa al alumno seleccionado.
   */
  verCalificaciones(alumno: any) {
    console.log('Ver calificaciones para:', alumno.nombre);
    
    // Navegar a la página de detalle de calificaciones con los datos del alumno
    this.navCtrl.navigateForward('/calificaciones-detalle', {
      queryParams: { alumno: JSON.stringify(alumno) }
    });
  }

  /**
   * @description Método de inicialización del componente.
   */
  ngOnInit() { }
}