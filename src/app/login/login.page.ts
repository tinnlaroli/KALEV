import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login', // Define el selector de este componente, que es usado para insertarlo en el HTML.
  templateUrl: './login.page.html', // Archivo HTML que contiene la plantilla de la página de login.
  styleUrls: ['./login.page.scss'], // Archivo CSS para estilos específicos de esta página.
  standalone: false // Este componente no es autónomo y dependerá de módulos importados.
})
export class LoginPage implements OnInit {
  email: string = ''; // Propiedad para almacenar el correo electrónico ingresado por el usuario.
  codigo: string = ''; // Propiedad para almacenar el código de clase ingresado por el usuario.
  cargando: boolean = false; // Propiedad para controlar si se está mostrando la animación de carga.

  // Constructor que inyecta las dependencias necesarias para el componente.
  constructor(
    private router: Router, // Inyecta el Router para redirigir a otras páginas.
    private alertController: AlertController, // Inyecta el controlador de alertas.
    private loadingController: LoadingController // Inyecta el controlador de cargadores (loading).
  ) {}

  // Función asíncrona que gestiona el inicio de sesión.
  async iniciarSesion() {
    // Valida si los campos están correctos antes de proceder.
    if (!this.validarCampos()) return;

    // Muestra la animación de carga.
    this.cargando = true;
    const loading = await this.loadingController.create({
      message: 'Verificando...', // Mensaje que se muestra durante la carga.
      spinner: 'crescent' // Tipo de animación (spinner).
    });

    // Muestra el loading en pantalla.
    await loading.present();

    let ruta = ''; // Variable para almacenar la ruta de redirección.
    if (this.codigo.startsWith('TCH-')) { // Si el código empieza con "TCH-", es un maestro.
      ruta = '/grupos'; // Redirige a la página de grupos.
      console.log('Usuario identificado como maestro');
    } else if (this.codigo.startsWith('STD-')) { // Si el código empieza con "STD-", es un alumno.
      ruta = '/courses'; // Redirige a la página de cursos.
      console.log('Usuario identificado como alumno');
    } else {
      // Si el código es inválido, cierra el loading antes de mostrar la alerta.
      await loading.dismiss();
      this.cargando = false;
      this.mostrarAlerta('Error', 'El código de clase es inválido. Use un código con prefijo TCH- o STD-.');
      return;
    }

    // Cierra el loading antes de redirigir.
    await loading.dismiss();
    this.cargando = false;
    this.router.navigate([ruta]); // Redirige a la ruta correspondiente.
  }

  // Función que valida si los campos de correo y código están completos y son válidos.
  validarCampos(): boolean {
    if (!this.email.trim() || !this.codigo.trim()) { // Verifica que los campos no estén vacíos.
      this.mostrarAlerta('Error', 'Todos los campos son obligatorios.'); // Muestra alerta si falta algún campo.
      return false; // Si algún campo es vacío, retorna false.
    }

    if (!this.validarEmail(this.email)) { // Verifica si el correo tiene un formato válido.
      this.mostrarAlerta('Error', 'Ingrese un correo válido.'); // Muestra alerta si el correo es inválido.
      return false; // Si el correo no es válido, retorna false.
    }

    return true; // Si todo es válido, retorna true.
  }

  // Función para validar el formato del correo electrónico usando una expresión regular.
  validarEmail(email: string): boolean {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Expresión regular para validar el correo.
    return regex.test(email); // Retorna true si el correo es válido según la expresión regular.
  }

  // Función para mostrar una alerta con un encabezado y un mensaje.
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header, // Título de la alerta.
      message, // Mensaje de la alerta.
      buttons: ['OK'] // Botón para cerrar la alerta.
    });
    await alert.present(); // Muestra la alerta en pantalla.
  }

  // Método que se ejecuta cuando se inicializa el componente, no se usa aquí.
  ngOnInit() {}
}