import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  email: string = '';
  codigo: string = '';
  cargando: boolean = false; // Aseguramos que esta propiedad exista

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async iniciarSesion() {
    if (!this.validarCampos()) return;

    // Mostrar animación de carga
    this.cargando = true;
    const loading = await this.loadingController.create({
      message: 'Verificando...',
      spinner: 'crescent'
    });

    // Mostrar el loading
    await loading.present();

    let ruta = '';
    if (this.codigo.startsWith('TCH-')) {
      ruta = '/grupos';
      console.log('Usuario identificado como maestro');
    } else if (this.codigo.startsWith('STD-')) {
      ruta = '/courses';
      console.log('Usuario identificado como alumno');
    } else {
      // Si el código es inválido, cerrar loading antes de mostrar alerta
      await loading.dismiss();
      this.cargando = false;
      this.mostrarAlerta('Error', 'El código de clase es inválido. Use un código con prefijo TCH- o STD-.');
      return;
    }

    // Cerrar loading antes de redirigir
    await loading.dismiss();
    this.cargando = false;
    this.router.navigate([ruta]);
  }

  validarCampos(): boolean {
    if (!this.email.trim() || !this.codigo.trim()) {
      this.mostrarAlerta('Error', 'Todos los campos son obligatorios.');
      return false;
    }

    if (!this.validarEmail(this.email)) {
      this.mostrarAlerta('Error', 'Ingrese un correo válido.');
      return false;
    }

    return true;
  }

  validarEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {}
}
