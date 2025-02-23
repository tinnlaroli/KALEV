// Importación de módulos y servicios necesarios
import { Component, OnInit } from '@angular/core'; // Importa el componente y el ciclo de vida OnInit de Angular
import { AlertController } from '@ionic/angular'; // Importa el controlador de alertas de Ionic
import { TranslateService } from '@ngx-translate/core'; // Importa el servicio de traducción de ngx-translate

@Component({
  selector: 'app-settings', // El selector para este componente en la plantilla HTML
  templateUrl: './settings.page.html', // URL de la plantilla asociada a este componente
  styleUrls: ['./settings.page.scss'], // URL del archivo de estilo asociado a este componente
  standalone: false // Indica que este componente no es independiente, depende de otros módulos
})
export class SettingsPage implements OnInit {
  selectedLanguage = 'es'; // Idioma por defecto (español)
  notificationsEnabled = true; // Notificaciones habilitadas por defecto
  theme = 'light'; // Tema por defecto (claro)

  // Inyección de dependencias a través del constructor
  constructor(
    private alertCtrl: AlertController, // Inyección del controlador de alertas
    private translate: TranslateService // Inyección del servicio de traducción
  ) {}

  // Método ngOnInit, se ejecuta al inicializar el componente
  ngOnInit() {
    // Establecer el idioma actual de la aplicación cuando se cargue el componente
    this.translate.use(this.selectedLanguage); // Establece el idioma usando el servicio de traducción
    this.setTheme(this.theme); // Aplica el tema por defecto
  }

  // Método para guardar la configuración seleccionada
  async saveSettings() {
    // Aplicar el idioma seleccionado
    this.translate.use(this.selectedLanguage); // Actualiza el idioma de la aplicación

    // Aplicar el tema seleccionado
    this.setTheme(this.theme); // Cambia el tema de la aplicación

    // Crear una alerta de confirmación
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('settings.saved_header'), // Traducción dinámica para el encabezado de la alerta
      message: this.translate.instant('settings.saved_message'), // Traducción dinámica para el mensaje de la alerta
      buttons: ['OK'], // Botón de confirmación
    });
    await alert.present(); // Muestra la alerta al usuario
  }

  // Método para aplicar el tema a toda la aplicación
  setTheme(theme: string) {
    document.body.classList.remove('light', 'dark'); // Elimina las clases de temas anteriores ('light' o 'dark')
    document.body.classList.add(theme); // Agrega la clase del tema seleccionado (claro o oscuro)
  }
}
