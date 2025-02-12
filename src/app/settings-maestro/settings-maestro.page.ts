import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings-maestro',
  templateUrl: './settings-maestro.page.html',
  styleUrls: ['./settings-maestro.page.scss'],
  standalone: false
})
export class SettingsMaestroPage implements OnInit {
  selectedLanguage: string = 'es'; // Valor por defecto: Español
  notificationsEnabled: boolean = true; // Valor por defecto: Notificaciones activadas
  theme: string = 'light'; // Valor por defecto: Tema claro

  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(this.selectedLanguage); // Establecer idioma por defecto
  }

  ngOnInit() {
    this.translate.use(this.selectedLanguage); // Usar el idioma al cargar la página
  }

  saveSettings() {
    console.log('Idioma seleccionado:', this.selectedLanguage);
    console.log('Notificaciones activadas:', this.notificationsEnabled);
    console.log('Tema seleccionado:', this.theme);
    // Aquí podrías almacenar estos valores en almacenamiento local o en un servicio
  }

  changeLanguage() {
    this.translate.use(this.selectedLanguage); // Cambiar el idioma según la selección
  }
}
