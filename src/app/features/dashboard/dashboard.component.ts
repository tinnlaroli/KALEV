import { Component, OnInit } from '@angular/core';
import { Chart, RadarController, RadialLinearScale, Title, Tooltip, Legend, LinearScale, PointElement, LineElement, Filler, ArcElement } from 'chart.js';

// Registrar los componentes necesarios
Chart.register(
  RadarController, 
  RadialLinearScale, 
  Title, 
  Tooltip, 
  Legend, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  ArcElement
);

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.createRadarChart();
  }

  createRadarChart(): void {
    const ctx = document.getElementById('radarChart') as HTMLCanvasElement;
    const radarChart = new Chart(ctx, {
      type: 'radar', // Tipo de gráfica
      data: {
        labels: ['Grupo 1', 'Grupo 2', 'Grupo 3', 'Grupo 4'], // Etiquetas para los 4 picos
        datasets: [{
          label: 'Rendimiento',
          data: [65, 59, 90, 81], // Datos de rendimiento para cada grupo
          fill: true, // Rellenar el área del gráfico
          backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color de fondo del área
          borderColor: 'rgb(26, 25, 25)', // Color del borde
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          r: {
            angleLines: {
              display: true // Muestra las líneas de ángulo para cada pico
            },
            suggestedMin: 0, // Mínimo sugerido para el eje radial
            suggestedMax: 100 // Máximo sugerido para el eje radial
          }
        }
      }
    });
  }
}
