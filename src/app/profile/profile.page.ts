// Importación de los módulos necesarios de Angular y Chart.js
import { Component, OnInit } from '@angular/core';  // Importación del decorador 'Component' y la interfaz 'OnInit' de Angular
import { Chart } from 'chart.js/auto';  // Importación de la librería Chart.js para crear gráficos

// Definición del componente 'ProfilePage' con su selector, plantilla y archivo de estilos
@Component({
  selector: 'app-profile',  // Nombre del selector que se usará para referirse a este componente en la plantilla HTML
  templateUrl: './profile.page.html',  // Ruta al archivo de plantilla HTML de este componente
  styleUrls: ['./profile.page.scss'],  // Ruta al archivo de estilos CSS/SCSS de este componente
  standalone: false  // Indica que este componente no es autónomo y depende de un módulo (por defecto 'false')
})
// Exportación de la clase del componente 'ProfilePage'
export class ProfilePage implements OnInit {

  // Constructor vacío (no realiza ninguna acción en este caso)
  constructor() { }

  // Método de inicialización que se ejecuta cuando el componente es creado (no realiza ninguna acción aquí)
  ngOnInit() {
  }

  // Método que se ejecuta después de que la vista del componente se haya inicializado
  ngAfterViewInit() {
    // Obtención del contexto del lienzo (canvas) para dibujar el gráfico, con el id 'spiderChart'
    const ctx = document.getElementById('spiderChart') as HTMLCanvasElement;

    // Creación de un nuevo gráfico utilizando Chart.js
    new Chart(ctx, {
      type: 'radar',  // Tipo de gráfico: 'radar' (gráfico de araña)
      data: {  // Datos que se van a mostrar en el gráfico
        labels: ['Kinestésico', 'Auditivo', 'Lectura', 'Escritura', 'Visual'],  // Etiquetas para cada uno de los ejes del gráfico
        datasets: [  // Conjunto de datos que se van a graficar
          {
            label: 'Desempeño',  // Nombre del conjunto de datos que aparecerá en la leyenda
            data: [80, 60, 82, 90, 75],  // Los valores de desempeño para cada una de las categorías (Kinestésico, Auditivo, etc.)
            borderColor: 'blue',  // Color del borde del gráfico (líneas del gráfico)
            backgroundColor: 'rgba(0, 0, 255, 0.2)',  // Color de fondo del área del gráfico (con transparencia)
          },
        ],
      },
    });
  }
}