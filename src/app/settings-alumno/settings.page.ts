import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false
})
export class SettingsPage implements OnInit {
  selectedLanguage = 'es'; // Idioma por defecto
  notificationsEnabled = true; // Notificaciones por defecto
  theme = 'light'; // Tema por defecto

  constructor(
    private alertCtrl: AlertController,
    private translate: TranslateService // Servicio para manejar el idioma
  ) {}

  ngOnInit() {
    // Establecer el idioma actual de la aplicación cuando se cargue el componente
    this.translate.use(this.selectedLanguage);
    this.setTheme(this.theme); // Aplicar el tema por defecto
  }

  async saveSettings() {
    // Aplicar el idioma seleccionado
    this.translate.use(this.selectedLanguage);

    // Aplicar el tema seleccionado
    this.setTheme(this.theme);

    // Mostrar alerta de confirmación
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('settings.saved_header'), // Traducción dinámica
      message: this.translate.instant('settings.saved_message'), // Traducción dinámica
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Método para aplicar el tema a toda la app
  setTheme(theme: string) {
    document.body.classList.remove('light', 'dark'); // Eliminar clases previas
    document.body.classList.add(theme); // Agregar la clase del tema seleccionado
  }
}
