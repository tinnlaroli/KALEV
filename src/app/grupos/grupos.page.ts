// Importa los módulos necesarios de Angular y de Ionic para el componente.
import { Component, OnInit } from '@angular/core';  // Se importa Component y OnInit desde Angular para crear el componente y gestionar su ciclo de vida.
import { ModalController } from '@ionic/angular';   // Se importa ModalController desde Ionic para manejar la apertura de modales.
import { GruposDetallePage } from '../grupos-detalle/grupos-detalle.page';  // Importa el componente de detalles de grupos que se mostrará en un modal.

// Define el decorador de componente que le indica a Angular que esta clase es un componente y cómo se debe representar.
@Component({
  selector: 'app-grupos',  // Define el nombre del selector de este componente en el HTML.
  templateUrl: './grupos.page.html',  // Especifica la ruta al archivo de plantilla (HTML) para este componente.
  styleUrls: ['./grupos.page.scss'],  // Especifica la ruta al archivo de estilos (CSS/SCSS) para este componente.
  standalone: false  // Indica que este componente no es independiente y depende de otros módulos para funcionar.
})
export class GruposPage implements OnInit {  // Define la clase del componente GruposPage que implementa OnInit para gestionar el ciclo de vida.
  
  // Define una lista de grupos con sus actividades correspondientes.
  grupos = [
    {
      grado: '1',  // Grado del grupo 1
      nombre: 'A',  // Nombre del grupo A
      maestro: 'Laura García García',  // Nombre del maestro del grupo
      numeroAlumnos: 25,  // Número de alumnos en el grupo
      actividades: [  // Lista de actividades asociadas al grupo.
        {
          titulo: 'Actividad de Matemáticas',  // Título de la actividad.
          fechaInicio: new Date('2025-02-10'),  // Fecha de inicio de la actividad.
          fechaFin: new Date('2025-02-12'),  // Fecha de fin de la actividad.
          descripcion: 'Resolución de problemas matemáticos.',  // Descripción de la actividad.
          tipoAprendizaje: 'Kinestésico',  // Tipo de aprendizaje asociado a la actividad.
          imagen: 'assets/icon/pierre.png'  // Ruta de la imagen que representa la actividad.
        },
        {
          titulo: 'Lectura Comprensiva',
          fechaInicio: new Date('2025-02-15'),
          fechaFin: new Date('2025-02-16'),
          descripcion: 'Comprensión de textos literarios.',
          tipoAprendizaje: 'Lecto-escritura',
          imagen: 'assets/icon/muricia.png'
        }
      ]
    },
    {
      grado: '4',
      nombre: 'B',
      maestro: 'Laura García García',
      numeroAlumnos: 30,
      actividades: [
        {
          titulo: 'Ciencia Experimental',
          fechaInicio: new Date('2025-02-20'),
          fechaFin: new Date('2025-02-22'),
          descripcion: 'Exploración de conceptos científicos.',
          tipoAprendizaje: 'Kinestésico',
          imagen: 'assets/icon/quetzal.png'
        },
        {
          titulo: 'Historia Interactiva',
          fechaInicio: new Date('2025-02-25'),
          fechaFin: new Date('2025-02-26'),
          descripcion: 'Aprender historia mediante dramatización.',
          tipoAprendizaje: 'Auditivo',
          imagen: 'assets/icon/gero.png'
        }
      ]
    },
    {
      grado: '6',
      nombre: 'A',
      maestro: 'Laura García García',
      numeroAlumnos: 28,
      actividades: [
        {
          titulo: 'Arte y Creatividad',
          fechaInicio: new Date('2025-03-01'),
          fechaFin: new Date('2025-03-03'),
          descripcion: 'Expresión artística mediante dibujo y pintura.',
          tipoAprendizaje: 'Visual',
          imagen: 'assets/icon/muricia.png'
        },
        {
          titulo: 'Programación Básica',
          fechaInicio: new Date('2025-03-05'),
          fechaFin: new Date('2025-03-07'),
          descripcion: 'Introducción a la lógica de programación.',
          tipoAprendizaje: 'Lógico-Matemático',
          imagen: 'assets/icon/pierre.png'
        }
      ]
    }
  ];

  // Constructor que recibe el ModalController de Ionic para manejar la creación y presentación de modales.
  constructor(private modalCtrl: ModalController) {}

  // El método ngOnInit es parte del ciclo de vida del componente, pero no se utiliza en este caso.
  ngOnInit() {}

  // Método asíncrono para mostrar los detalles de un grupo en un modal cuando se selecciona.
  async mostrarDetalles(grupo: any) {
    // Crea un modal que contiene el componente GruposDetallePage y pasa las propiedades necesarias (grupo seleccionado).
    const modal = await this.modalCtrl.create({
      component: GruposDetallePage,  // Especifica el componente que se mostrará dentro del modal.
      componentProps: { grupo }  // Pasa el grupo seleccionado como propiedad al modal.
    });
    // Muestra el modal en pantalla.
    await modal.present();
  }
}