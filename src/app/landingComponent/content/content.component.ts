import { Component } from '@angular/core';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'], 
  standalone: false
})
export class ContentComponent {
  aprendizajeCards = [
    {
      titulo: 'Aprendizaje Kinestésico',
      color: '#ff5733',
      img: 'assets/kinestesico.jpg',
      descripcion: 'La preferencia kinestésica permite que los estudiantes se involucren activamente en el proceso de aprendizaje...',
      puntos: [
        'Uso de la experiencia y la práctica, real o simulada.',
        'Incluye demostraciones, simulaciones y videos de situaciones reales.',
        'Aprendizaje mediante experiencias directas y vivencias propias.',
        'Adecuada para tareas con detalles específicos y estudios de caso prácticos.'
      ]
    },
    {
      titulo: 'Aprendizaje Lector-Escritor',
      color: '#4EBC97',
      img: 'assets/lectoescritor.jpg',
      descripcion: 'La preferencia de lectura/escritura se centra en la presentación de información a través de palabras...',
      puntos: [
        'Uso de texto para recibir y expresar información.',
        'Abarca manuales, informes, ensayos y tareas.',
        'Usuarios frecuentes de herramientas como PowerPoint, Internet, listas, diarios...',
        'Presentaciones de PowerPoint y sitios como Wikipedia son adecuados...'
      ]
    },
    {
      titulo: 'Aprendizaje Visual',
      color: '#0081A7',
      img: 'assets/visual.jpg',
      descripcion: 'La preferencia visual se enfoca en la representación de información mediante mapas, diagramas, gráficos...',
      puntos: [
        'Representación de información con mapas, diagramas y gráficos.',
        'Excluye imágenes fijas, películas, videos y presentaciones en PowerPoint.',
        'Incluye diseños, patrones y formas para resaltar y transmitir información.'
      ]
    },
    {
      titulo: 'Aprendizaje Auditivo',
      color: '#ffd333',
      img: 'assets/auditivo.jpg',
      descripcion: 'La preferencia auditiva implica recibir información a través de escuchar o hablar...',
      puntos: [
        'Recibir información mediante escuchar o hablar.',
        'Aprendizaje óptimo con conferencias, discusiones grupales y radio.',
        'Hablar en voz alta y consigo mismo para ordenar ideas y resolver problemas.'
      ]
    }
  ];

  flipIndex: number | null = null;

  toggleFlip(index: number) {
    this.flipIndex = this.flipIndex === index ? null : index;
  }
}
