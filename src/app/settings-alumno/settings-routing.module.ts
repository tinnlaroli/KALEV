// Importación de módulos necesarios para el enrutamiento de Angular
import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir un módulo de Angular
import { Routes, RouterModule } from '@angular/router'; // Importa RouterModule para definir las rutas de navegación

// Importación del componente SettingsPage que se va a asociar con la ruta
import { SettingsPage } from './settings.page';

// Definición de las rutas de la aplicación
const routes: Routes = [
  {
    path: '', // Define la ruta para la página de configuración
    component: SettingsPage // Asocia la ruta vacía con el componente SettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Configura el enrutamiento para este módulo, utilizando las rutas definidas
  exports: [RouterModule], // Exporta RouterModule para que otras partes de la aplicación puedan acceder al enrutamiento
})
// Definición del módulo SettingsPageRoutingModule, que encapsula las rutas asociadas con la página de configuración
export class SettingsPageRoutingModule {}