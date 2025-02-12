import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
  standalone: false
})
export class CoursesPage implements OnInit {
  activities = [
    {
      name: 'Álgebra Básica',
      type: 'Matemáticas',
      startDate: '2025-02-01',
      endDate: '2025-02-15',
      learningType: 'Kinestésico-Visual',
      teacher: 'Profa. Francisco Juárez Pérez',
      icon: 'assets/icon/math.png',
    },
    {
      name: 'Geografía Mundial',
      type: 'Geografía',
      startDate: '2025-02-02',
      endDate: '2025-02-20',
      learningType: 'Auditivo',
      teacher: 'Prof. Sergio López López',
      icon: 'assets/icon/geography.png',
    },
    {
      name: 'Ciencias Naturales',
      type: 'Ciencias',
      startDate: '2025-02-03',
      endDate: '2025-02-18',
      learningType: 'Lectura-Escritura',
      teacher: 'Profa. Karina Martínez Aldama',
      icon: 'assets/icon/science.png',
    },
    {
      name: 'Redacción y Ortografía',
      type: 'Español',
      startDate: '2025-02-04',
      endDate: '2025-02-22',
      learningType: 'Visual',
      teacher: 'Prof. Amelia Rivera Rivas',
      icon: 'assets/icon/spanish.png',
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  // Agrega las funciones de resaltar y eliminar el resalte
  highlightCard(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    target.style.transform = 'scale(1.1)';
    target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
  }

  removeHighlight(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    target.style.transform = 'scale(1)';
    target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  }

}

