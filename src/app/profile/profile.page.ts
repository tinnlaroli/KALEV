import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit, AfterViewChecked {
  estudiante: any = null;
  alias: string = '';
  aliasGuardado: string = '';
  aliasTemporal: string = '';
  isLoading: boolean = true;
  private radarChart: Chart | null = null;
  private graficaCargada: boolean = false;

  constructor(
    private apiService: ApiService,
    private alertController: AlertController,
    private storage: Storage
  ) {
    Chart.register(...registerables);
    this.storage.create();
  }

  async ngOnInit() {
    await this.cargarDatosEstudiante();
  }

  async ionViewWillEnter() {
    await this.cargarDatosEstudiante();
    this.graficaCargada = false;
  }

  async cargarDatosEstudiante() {
    this.isLoading = true;
    try {
      this.estudiante = await this.apiService.getSavedStudent();
      const aliasLocal = await this.storage.get('jugador_alias');
      this.alias = aliasLocal || '';
      this.aliasGuardado = aliasLocal || '';
      this.aliasTemporal = aliasLocal || '';

      if (!this.estudiante) {
        await this.mostrarAlerta('No se encontraron datos del estudiante');
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
      await this.mostrarAlerta('Error al cargar el perfil');
    } finally {
      this.isLoading = false;
    }
  }

  ngAfterViewChecked() {
    if (!this.graficaCargada && !this.isLoading && this.estudiante) {
      setTimeout(() => this.generarGrafica(), 0);
      this.graficaCargada = true;
    }
  }

  generarGrafica() {
    const canvas = document.getElementById('spiderChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (this.radarChart) {
      this.radarChart.destroy();
    }

    this.radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Kinestésico', 'Auditivo', 'Lectura', 'Escritura', 'Visual'],
        datasets: [{
          label: 'Desempeño',
          data: [80, 70, 60, 90, 75],
          borderColor: 'blue',
          backgroundColor: 'rgba(0, 0, 255, 0.2)',
          pointBackgroundColor: 'blue'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20
            }
          }
        }
      }
    });
  }

  async guardarAlias() {
    try {
      await this.storage.set('jugador_alias', this.aliasTemporal);
      this.alias = this.aliasTemporal;
      this.aliasGuardado = this.aliasTemporal;
      await this.mostrarAlerta('Alias actualizado exitosamente');
    } catch (error) {
      console.error('Error al guardar alias:', error);
      await this.mostrarAlerta('No se pudo guardar el alias');
    }
  }

  private async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}