// Importación de componentes necesarios
import { Component, OnInit } from '@angular/core'; // Importa los decoradores Component y OnInit de Angular
import { TranslateService } from '@ngx-translate/core'; // Importa el servicio de traducción para manejar los idiomas

// Decorador Component que define el selector, template y estilos del componente
@Component({
  selector: 'app-settings-maestro', // Nombre del selector del componente en HTML
  templateUrl: './settings-maestro.page.html', // Ruta al archivo HTML que define la estructura de la página
  styleUrls: ['./settings-maestro.page.scss'], // Ruta al archivo de estilos SCSS asociados al componente
  standalone: false // Establece que este componente no es autónomo, sino que está dentro de un módulo
})
// Clase del componente SettingsMaestroPage que implementa la interfaz OnInit
export class SettingsMaestroPage implements OnInit {
  // Definición de las propiedades del componente
  selectedLanguage: string = 'es'; // Valor por defecto del idioma seleccionado (Español)
  notificationsEnabled: boolean = true; // Valor por defecto de las notificaciones (activadas)
  theme: string = 'light'; // Valor por defecto del tema (claro)

  // Constructor que inyecta el servicio TranslateService para manejar las traducciones
  constructor(private translate: TranslateService) {
    // Establece el idioma por defecto usando el valor de selectedLanguage
    this.translate.setDefaultLang(this.selectedLanguage);
  }

  // Método ngOnInit que se ejecuta al inicializar el componente
  ngOnInit() {
    // Aplica el idioma seleccionado al cargar la página
    this.translate.use(this.selectedLanguage);
  }

  // Método para guardar la configuración de la página
  saveSettings() {
    // Muestra en la consola los valores actuales de las configuraciones
    console.log('Idioma seleccionado:', this.selectedLanguage);
    console.log('Notificaciones activadas:', this.notificationsEnabled);
    console.log('Tema seleccionado:', this.theme);
    // Aquí puedes agregar el código para almacenar estos valores en almacenamiento local o en un servicio
  }

  // Método para cambiar el idioma de la aplicación
  changeLanguage() {
    // Cambia el idioma de la aplicación según la selección del usuario
    this.translate.use(this.selectedLanguage);
  }
}
