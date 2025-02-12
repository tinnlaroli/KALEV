import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.page.html',
  styleUrls: ['./actividades.page.scss'],
  standalone: false
})
export class ActividadesPage implements OnInit {
  actividades = [
    {
      titulo: 'Actividad de Matemáticas',
      fechaInicio: new Date('2025-02-10'),
      fechaFin: new Date('2025-02-12'),
      descripcion: 'Actividad enfocada en la resolución de problemas matemáticos.',
      tipoAprendizaje: 'Activo',
      grupo: '1er A',
      imagen: 'assets/mascotas/gato1.jpg', // Imagen de una mascota
    },
    {
      titulo: 'Lectura Comprensiva',
      fechaInicio: new Date('2025-02-15'),
      fechaFin: new Date('2025-02-16'),
      descripcion: 'Actividad de lectura y comprensión de textos literarios.',
      tipoAprendizaje: 'Teórico',
      grupo: '2do B',
      imagen: 'assets/mascotas/gato2.jpg', // Imagen de una mascota
    },
    {
      titulo: 'Ciencia Experimental',
      fechaInicio: new Date('2025-02-20'),
      fechaFin: new Date('2025-02-22'),
      descripcion: 'Exploración práctica de conceptos científicos mediante experimentos.',
      tipoAprendizaje: 'Activo',
      grupo: '3er C',
      imagen: 'assets/mascotas/gato3.jpg', // Imagen de una mascota
    }
  ];

  constructor() { }

  crearActividad() {
    console.log('Crear nueva actividad');
    // Aquí se podría abrir un formulario o alguna acción para crear una actividad
  }

  ngOnInit() {
  }

}
