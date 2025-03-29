import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  email: string = '';
  codigo: string = '';
  cargando: boolean = false;
  emailInvalid: boolean = false;
  codigoInvalid: boolean = false;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private apiService: ApiService
  ) {}

  async iniciarSesion() {
    this.validarEmail();
    this.validarCodigo();

    if (this.emailInvalid || this.codigoInvalid) {
      this.mostrarToast('Por favor completa todos los campos correctamente', 'warning');
      return;
    }

    this.cargando = true;

    const loading = await this.loadingController.create({
      message: 'Verificando credenciales...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const respuesta = await this.apiService.login(this.email, this.codigo);

      if (respuesta?.success) {
        await loading.dismiss();
        this.mostrarToast('¡Bienvenido, ' + respuesta.estudiante.nombre + '!', 'success');
        this.router.navigate(['/home']);
      } else {
        await loading.dismiss();
        this.mostrarToast(respuesta?.message || 'Credenciales incorrectas');
      }
    } catch (error: any) {
      await loading.dismiss();
      this.mostrarToast(this.getMensajeError(error));
    } finally {
      this.cargando = false;
    }
  }

  validarEmail() {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.emailInvalid = !regex.test(this.email);
    return !this.emailInvalid;
  }

  validarCodigo() {
    this.codigoInvalid = !this.codigo.trim();
    return !this.codigoInvalid;
  }

  private getMensajeError(error: any): string {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) return 'Error de conexión con el servidor';
      if (error.status === 401) return 'Credenciales inválidas';
      if (error.status === 500) return 'Error del servidor, intenta más tarde';
      return error.error?.message || 'Ocurrió un error inesperado';
    }
    return typeof error === 'string' ? error : 'Error desconocido';
  }

  private async mostrarToast(
    mensaje: string,
    color: 'danger' | 'success' | 'warning' = 'danger'
  ) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'top',
      color
    });
    toast.present();
  }
}
