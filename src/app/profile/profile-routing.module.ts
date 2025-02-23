// Importación de los módulos necesarios para configurar el enrutamiento en Angular
import { NgModule } from '@angular/core';  // Importación del decorador 'NgModule' de Angular para definir un módulo
import { Routes, RouterModule } from '@angular/router';  // Importación de las clases necesarias para configurar las rutas de la aplicación

// Importación del componente 'ProfilePage' que se asociará a la ruta principal de esta página
import { ProfilePage } from './profile.page';

// Definición de las rutas para esta sección de la aplicación
const routes: Routes = [
  {
    path: '',  // Ruta principal para esta página (cuando no hay más especificación en la URL)
    component: ProfilePage  // El componente 'ProfilePage' se mostrará cuando esta ruta sea visitada
  }
];

// Definición del módulo para la configuración de las rutas de la página de perfil
@NgModule({
  imports: [RouterModule.forChild(routes)],  // Importación del módulo de enrutamiento con las rutas definidas previamente
  exports: [RouterModule],  // Exportación del RouterModule para que las rutas estén disponibles en otras partes de la aplicación
})
// Exportación del módulo de enrutamiento de la página de perfil
export class ProfilePageRoutingModule {}