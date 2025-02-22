import { Component, OnInit } from '@angular/core';

/**
 * Interfaz que define la estructura de una actividad.
 */
interface Actividad {
  titulo: string;        // Nombre de la actividad
  fechaInicio: Date;     // Fecha de inicio de la actividad
  fechaFin: Date;        // Fecha de finalización de la actividad
  descripcion: string;   // Descripción breve de la actividad
  tipoAprendizaje: string; // Tipo de aprendizaje asociado a la actividad
  imagen: string;        // Ruta de la imagen representativa de la actividad
}

@Component({
  selector: 'app-actividades', // Selector del componente
  templateUrl: './actividades.page.html', // Ruta del archivo de la vista HTML
  styleUrls: ['./actividades.page.scss'], // Ruta de los estilos del componente
  standalone: false // Indica que este componente depende de otros módulos
})
export class ActividadesPage implements OnInit {

  /**
   * Lista de actividades disponibles en la aplicación.
   * Cada actividad tiene un título, fechas de inicio y fin, descripción,
   * tipo de aprendizaje y una imagen representativa.
   */
  actividades: Actividad[] = [
    {
      titulo: 'Actividad de Matemáticas',
      fechaInicio: new Date('2025-02-10'),
      fechaFin: new Date('2025-02-12'),
      descripcion: 'Actividad enfocada en la resolución de problemas matemáticos.',
      tipoAprendizaje: 'Kinestésico',
      imagen: 'assets/icon/pierre.png', // Imagen de una mascota
    },
    {
      titulo: 'Lectura Comprensiva',
      fechaInicio: new Date('2025-02-15'),
      fechaFin: new Date('2025-02-16'),
      descripcion: 'Actividad de lectura y comprensión de textos literarios.',
      tipoAprendizaje: 'Lecto-escritura',
      imagen: 'assets/icon/muricia.png', // Imagen de una mascota
    },
    {
      titulo: 'Ciencia Experimental',
      fechaInicio: new Date('2025-02-20'),
      fechaFin: new Date('2025-02-22'),
      descripcion: 'Exploración práctica de conceptos científicos mediante experimentos.',
      tipoAprendizaje: 'Kinestésico',
      imagen: 'assets/icon/quetzal.png', // Imagen de una mascota
    }
  ];

  constructor() { }

  /**
   * Método para agregar una nueva actividad.
   * Actualmente solo muestra un mensaje en la consola,
   * pero podría abrir un formulario o ejecutar una lógica específica.
   */
  agregarActividad() {
    console.log('Crear nueva actividad');
  }

  /**
   * Método para asignar una actividad a un grupo.
   * @param actividad Actividad seleccionada para asignar a un grupo.
   * En una implementación real, podría abrir un modal o ejecutar una lógica específica.
   */
  asignarAGrupo(actividad: Actividad) {
    console.log('Asignando actividad:', actividad.titulo);
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al inicializar el componente.
   * Puede usarse para cargar datos o inicializar variables.
   */
  ngOnInit() {
  }
}
