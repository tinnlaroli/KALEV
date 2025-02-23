// Importación de módulos necesarios de Angular y Ionic
import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir un módulo de Angular
import { CommonModule } from '@angular/common'; // Importa CommonModule, que contiene las funcionalidades básicas de Angular
import { FormsModule } from '@angular/forms'; // Importa FormsModule para trabajar con formularios en Angular

import { IonicModule } from '@ionic/angular'; // Importa IonicModule para usar componentes de Ionic en este módulo

// Importa el módulo de enrutamiento específico de esta página
import { SettingsPageRoutingModule } from './settings-routing.module';

// Importa el componente SettingsPage que se va a declarar en este módulo
import { SettingsPage } from './settings.page';

@NgModule({
  imports: [
    CommonModule, // Se importa CommonModule para que los componentes comunes de Angular estén disponibles
    FormsModule, // Se importa FormsModule para trabajar con formularios
    IonicModule, // Se importa IonicModule para usar componentes de Ionic
    SettingsPageRoutingModule // Se importa el módulo de enrutamiento de SettingsPage para definir las rutas asociadas
  ],
  declarations: [SettingsPage] // Se declara el componente SettingsPage para ser usado en este módulo
})
// Definición del módulo SettingsPageModule, que encapsula todos los recursos relacionados con la página de configuración
export class SettingsPageModule {}