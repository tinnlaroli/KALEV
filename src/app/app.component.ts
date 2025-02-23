// Importa el decorador Component desde Angular, necesario para definir un componente en Angular.
import { Component } from '@angular/core';

// Importa Platform desde Ionic, utilizado para interactuar con las características de la plataforma (como el acceso a la red o al sistema de archivos).
import { Platform } from '@ionic/angular';

// Importa Router desde Angular, utilizado para gestionar la navegación entre las rutas de la aplicación.
import { Router } from '@angular/router';

// Importa TranslateService desde @ngx-translate/core, utilizado para gestionar las traducciones en la aplicación.
import { TranslateService } from '@ngx-translate/core';

// Decorador @Component, que define las propiedades del componente.
@Component({
  // Selector que será utilizado para identificar el componente en las plantillas HTML.
  selector: 'app-root',
  
  // Archivo de la plantilla HTML del componente. Define la estructura visual del componente.
  templateUrl: 'app.component.html',
  
  // Archivo de estilos (CSS/SCSS) del componente.
  styleUrls: ['app.component.scss'],
  
  // Configura si el componente debe ser parte de un módulo standalone o no. En este caso, es false (no standalone).
  standalone: false,
})
// Clase del componente AppComponent, que representa la aplicación principal.
export class AppComponent {
  // El constructor recibe el servicio TranslateService para poder utilizarlo en el componente.
  constructor(private translate: TranslateService) {
    // Llama al método initializeApp para realizar configuraciones iniciales.
    this.initializeApp();
  }

  // Método para inicializar la aplicación.
  initializeApp() {
    // Establece el idioma por defecto como 'es' (español).
    this.translate.setDefaultLang('es');
    
    // Establece el idioma inicial como 'es' (español).
    this.translate.use('es');
  }
}
