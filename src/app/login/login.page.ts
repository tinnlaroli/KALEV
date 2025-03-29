import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
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
  errorGeneral: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private apiService: ApiService
  ) {}

  async iniciarSesion() {
    this.validarEmail();
    this.validarCodigo();
    
    if (this.emailInvalid || this.codigoInvalid) {
      this.errorGeneral = 'Por favor complete todos los campos correctamente';
      return;
    }

    this.cargando = true;
    this.errorGeneral = '';
    
    const loading = await this.loadingController.create({
      message: 'Verificando credenciales...',
      spinner: 'crescent'
    });
    await loading.present();

    try {
      const respuesta = await this.apiService.login(this.email, this.codigo).toPromise();
      
      if (respuesta?.success) {
        await this.apiService.saveAuthData(respuesta.token, respuesta.estudiante);
        await loading.dismiss();
        this.router.navigate(['/home']); // Cambiado a '/profile' para ir directo al perfil
      } else {
        this.errorGeneral = respuesta?.message || 'Credenciales incorrectas. Por favor intente nuevamente.';
      }
    } catch (error: unknown) {
      this.manejarError(error);
    } finally {
      this.cargando = false;
      await loading.dismiss();
    }
  }

  private manejarError(error: unknown) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 400) {
        this.errorGeneral = error.error?.message || 'Credenciales incorrectas o formato inválido';
      } else if (error.status === 401) {
        this.errorGeneral = 'No autorizado. Verifique sus credenciales.';
      } else if (error.status >= 500) {
        this.errorGeneral = 'Error en el servidor. Por favor intente más tarde.';
      } else {
        this.errorGeneral = 'Error al conectar con el servidor';
      }
    } else if (typeof error === 'string') {
      this.errorGeneral = error;
    } else {
      this.errorGeneral = 'Error desconocido al iniciar sesión';
    }
    console.error('Error en el login:', error);
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
}