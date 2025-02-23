// Importación de módulos necesarios para la configuración del módulo Angular
import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir un módulo de Angular
import { CommonModule } from '@angular/common'; // Importa el módulo CommonModule, que proporciona directivas comunes como ngIf y ngFor
import { FormsModule } from '@angular/forms'; // Importa FormsModule para trabajar con formularios reactivos y ngModel
import { IonicModule } from '@ionic/angular'; // Importa el módulo IonicModule que proporciona componentes de Ionic como botones, formularios, etc.

import { SettingsMaestroPageRoutingModule } from './settings-maestro-routing.module'; // Importa el módulo de rutas asociado con la página de configuración del maestro

import { SettingsMaestroPage } from './settings-maestro.page'; // Importa la clase del componente SettingsMaestroPage

// Definición del módulo SettingsMaestroPageModule
@NgModule({
  imports: [
    CommonModule, // Importa CommonModule para utilizar funcionalidades básicas de Angular
    FormsModule, // Importa FormsModule para el manejo de formularios
    IonicModule, // Importa IonicModule para usar los componentes de Ionic
    SettingsMaestroPageRoutingModule // Importa el módulo de rutas para manejar las rutas asociadas a esta página
  ],
  declarations: [SettingsMaestroPage] // Declara el componente SettingsMaestroPage como parte del módulo
})
export class SettingsMaestroPageModule {} // Exporta el módulo SettingsMaestroPageModule para ser utilizado en otros módulos