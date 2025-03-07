import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  // Arreglo que contiene las actividades del curso, con información sobre cada una.
  activities = [
    {
      name: 'Álgebra Básica',  // Nombre del curso.
      type: 'Matemáticas',  // Tipo de asignatura.
      startDate: '2025-02-01',  // Fecha de inicio del curso.
      endDate: '2025-02-15',  // Fecha de fin del curso.
      learningType: 'Kinestésico-Visual',  // Estilo de aprendizaje asociado al curso.
      teacher: 'Profa. Francisco Juárez Pérez',  // Nombre del profesor.
      icon: 'assets/icon/math.png',  // Ruta al ícono que representa el curso.
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

  // Constructor del componente (vacío en este caso, pero se puede utilizar para inyectar dependencias).
  constructor() { }

  // El ciclo de vida ngOnInit se ejecuta cuando se inicializa el componente.
  ngOnInit() {
    // Este método puede utilizarse para inicializar datos o realizar tareas después de que el componente haya sido cargado.
  }

  // Función para resaltar la tarjeta (curso) al pasar el ratón sobre ella.
  highlightCard(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;  // Obtiene el elemento HTML sobre el que se hace hover.
    target.style.transform = 'scale(1.1)';  // Aumenta el tamaño del elemento (efecto de escala).
    target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';  // Añade una sombra para dar el efecto de profundidad.
  }

  // Función para eliminar el resalte de la tarjeta (cuando el ratón sale de encima de la tarjeta).
  removeHighlight(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;  // Obtiene el elemento HTML sobre el que se hace hover.
    target.style.transform = 'scale(1)';  // Restaura el tamaño original del elemento.
    target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';  // Restaura la sombra a un valor más tenue.
  }

}
