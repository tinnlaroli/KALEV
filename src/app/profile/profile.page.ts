import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { LoadingController } from '@ionic/angular';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit, AfterViewInit {
  @ViewChild('spiderChart') spiderChartRef!: ElementRef;
  
  estudiante: any = null;
  cargando: boolean = true;
  chart: any;

  constructor(
    private apiService: ApiService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    await this.cargarDatosEstudiante();
  }

  ngAfterViewInit() {
    this.createChart();
  }

  async cargarDatosEstudiante() {
    const loading = await this.loadingController.create({
      message: 'Cargando perfil...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      this.estudiante = await this.apiService.getDatosEstudiante().toPromise();
      // Si necesitas actualizar el chart con datos del estudiante:
      if (this.chart && this.estudiante?.habilidades) {
        this.updateChartData();
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      this.cargando = false;
      await loading.dismiss();
    }
  }

  createChart() {
    const ctx = this.spiderChartRef.nativeElement;
    this.chart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Kinestésico', 'Auditivo', 'Lectura', 'Escritura', 'Visual'],
        datasets: [{
          label: 'Desempeño',
          data: [80, 60, 82, 90, 75],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          pointBackgroundColor: 'rgba(75, 192, 192, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(75, 192, 192, 1)'
        }]
      },
      options: {
        scales: {
          r: {
            angleLines: {
              display: true
            },
            suggestedMin: 0,
            suggestedMax: 100
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  updateChartData() {
    // Ejemplo de cómo actualizar el chart con datos reales del estudiante
    if (this.estudiante.habilidades) {
      this.chart.data.datasets[0].data = [
        this.estudiante.habilidades.kinestesico || 0,
        this.estudiante.habilidades.auditivo || 0,
        this.estudiante.habilidades.lectura || 0,
        this.estudiante.habilidades.escritura || 0,
        this.estudiante.habilidades.visual || 0
      ];
      this.chart.update();
    }
  }

  getNombreCompleto(): string {
    if (!this.estudiante) return 'Nombre del Estudiante';
    return `${this.estudiante.nombre} ${this.estudiante.ap_paterno} ${this.estudiante.ap_materno}`;
  }
}