import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  estudiante: any = null;
  isLoading: boolean = true;

  constructor(
    private apiService: ApiService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    await this.cargarDatosEstudiante();
  }

  async ionViewWillEnter() {
    await this.cargarDatosEstudiante();
  }

  async cargarDatosEstudiante() {
    this.isLoading = true;
    try {
      this.estudiante = await this.apiService.getSavedStudent();
      
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

  private async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Aviso',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }
}