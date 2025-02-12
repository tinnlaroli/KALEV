import { Component, OnInit } from '@angular/core';

// Definir la interfaz para la estructura de la actividad
interface Actividad {
  titulo: string;
  fechaInicio: Date;
  fechaFin: Date;
  descripcion: string;
  tipoAprendizaje: string;
  imagen: string;
}

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
  standalone: false
})
export class ActividadesPage implements OnInit {
  actividades: Actividad[] = [  // Usar la interfaz aquí
    {
      titulo: 'Actividad de Matemáticas',
      fechaInicio: new Date('2025-02-10'),
      fechaFin: new Date('2025-02-12'),
      descripcion: 'Actividad enfocada en la resolución de problemas matemáticos.',
      tipoAprendizaje: 'Activo',
      imagen: 'assets/mascotas/gato1.jpg', // Imagen de una mascota
    },
    {
      titulo: 'Lectura Comprensiva',
      fechaInicio: new Date('2025-02-15'),
      fechaFin: new Date('2025-02-16'),
      descripcion: 'Actividad de lectura y comprensión de textos literarios.',
      tipoAprendizaje: 'Teórico',
      imagen: 'assets/mascotas/gato2.jpg', // Imagen de una mascota
    },
    {
      titulo: 'Ciencia Experimental',
      fechaInicio: new Date('2025-02-20'),
      fechaFin: new Date('2025-02-22'),
      descripcion: 'Exploración práctica de conceptos científicos mediante experimentos.',
      tipoAprendizaje: 'Activo',
      imagen: 'assets/mascotas/gato3.jpg', // Imagen de una mascota
    }
  ];

  constructor() { }

  agregarActividad() {
    console.log('Crear nueva actividad');
    // Aquí se podría abrir un formulario o alguna acción para crear una actividad
  }

  // Función para asignar la actividad a un grupo
  asignarAGrupo(actividad: Actividad) {  // Usar el tipo Actividad para el parámetro
    console.log('Asignando actividad:', actividad.titulo);
    // Lógica para asignar la actividad a un grupo, por ejemplo, abrir un modal para elegir un grupo
  }

  ngOnInit() {
  }
}
