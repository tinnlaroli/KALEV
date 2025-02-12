import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GruposDetallePage } from '../grupos-detalle/grupos-detalle.page';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.page.html',
  styleUrls: ['./grupos.page.scss'],
  standalone: false
})
export class GruposPage implements OnInit {
  grupos = [
    {
      grado: '1',
      nombre: 'A',
      maestro: 'Laura García García',
      numeroAlumnos: 25,
      actividades: [
        {
          titulo: 'Actividad de Matemáticas',
          fechaInicio: new Date('2025-02-10'),
          fechaFin: new Date('2025-02-12'),
          descripcion: 'Resolución de problemas matemáticos.',
          tipoAprendizaje: 'Kinestésico',
          imagen: 'assets/icon/pierre.png'
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

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async mostrarDetalles(grupo: any) {
    const modal = await this.modalCtrl.create({
      component: GruposDetallePage,
      componentProps: { grupo }
    });
    await modal.present();
  }
}
