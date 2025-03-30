import { Component, OnInit } from '@angular/core';
import { 
  Chart, 
  RadarController, 
  RadialLinearScale, 
  PointElement, 
  LineElement, 
  Filler, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

@Component({
  standalone: false,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor() { 
    Chart.register(
      RadarController,
      RadialLinearScale,
      PointElement,
      LineElement,
      Filler,
      Title,
      Tooltip,
      Legend
    );
  }

  ngOnInit(): void {
    this.createRadarChart();
    this.animateElements();
  }

  createRadarChart(): void {
    const ctx = document.getElementById('radarChart') as HTMLCanvasElement;
    const radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Matemáticas', 'Ciencias', 'Lenguaje', 'Historia', 'Arte', 'Deportes'],
        datasets: [
          {
            label: 'Grupo A',
            data: [75, 90, 85, 70, 60, 80],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointHoverRadius: 5
          },
          {
            label: 'Grupo B',
            data: [85, 70, 75, 90, 80, 65],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointHoverRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: '#333',
              font: {
                size: 14,
                family: "'Poppins', sans-serif"
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            titleFont: {
              size: 16,
              family: "'Poppins', sans-serif"
            },
            bodyFont: {
              size: 14,
              family: "'Poppins', sans-serif"
            }
          }
        },
        scales: {
          r: {
            angleLines: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            pointLabels: {
              font: {
                size: 12,
                family: "'Poppins', sans-serif"
              },
              color: '#555'
            },
            ticks: {
              backdropColor: 'transparent',
              color: '#777',
              font: {
                family: "'Poppins', sans-serif"
              }
            },
            suggestedMin: 0,
            suggestedMax: 100
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeOutQuart'
        }
      }
    });
  }

  animateElements(): void {
    // Animación para las tarjetas
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('animated');
      }, 150 * index);
    });

    // Animación para el widget
    setTimeout(() => {
      const widget = document.querySelector('.floating-widget');
      if (widget) {
        widget.classList.add('animated');
      }
    }, 800);
  }
}