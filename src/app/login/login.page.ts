import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../services/api.service';

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
    // Validación inicial
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
      
      if (respuesta) {
        await loading.dismiss();
        this.router.navigate(['/home']);
      } else {
        this.errorGeneral = 'Credenciales incorrectas. Por favor intente nuevamente.';
      }
    } catch (error) {
      console.error('Error en el login:', error);
      this.errorGeneral = 'Error al conectar con el servidor. Intente más tarde.';
    } finally {
      this.cargando = false;
      await loading.dismiss();
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
}