// Importación de módulos necesarios para configurar el enrutamiento en Angular
import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir un módulo de Angular
import { Routes, RouterModule } from '@angular/router'; // Importa los módulos Routes y RouterModule para configurar el enrutamiento en Angular

import { SettingsMaestroPage } from './settings-maestro.page'; // Importa el componente de la página de configuración del maestro

// Definición de las rutas para la página de configuración del maestro
const routes: Routes = [
  {
    path: '', // Ruta raíz (cuando se accede a esta ruta sin especificar ningún subcamino)
    component: SettingsMaestroPage // El componente que se cargará cuando se acceda a la ruta
  }
];

// Definición del módulo SettingsMaestroPageRoutingModule
@NgModule({
  imports: [RouterModule.forChild(routes)], // Configura el enrutamiento utilizando RouterModule.forChild para rutas hijo (no principales)
  exports: [RouterModule], // Exporta RouterModule para que otras partes de la aplicación puedan acceder a las rutas definidas
})
export class SettingsMaestroPageRoutingModule {} // Exporta el módulo para su uso en otros módulos
