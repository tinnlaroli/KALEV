import { NgModule } from '@angular/core'; // Importa el decorador NgModule desde Angular para definir el módulo
import { Routes, RouterModule } from '@angular/router'; // Importa Routes (para definir rutas) y RouterModule (para configurarlas)

import { SplashPage } from './splash.page'; // Importa el componente SplashPage, que se usará en la ruta

// Definición de las rutas específicas para la página de splash
const routes: Routes = [
  {
    path: '', // Ruta raíz para esta página
    component: SplashPage // Asocia el componente SplashPage a esta ruta
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Importa RouterModule y configura las rutas definidas
  exports: [RouterModule], // Exporta RouterModule para que otras partes de la aplicación puedan usar estas rutas
})
export class SplashPageRoutingModule {} // Define el módulo que maneja las rutas para la SplashPage
