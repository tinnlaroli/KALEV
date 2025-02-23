import { NgModule } from '@angular/core'; // Importa el decorador NgModule para definir un módulo en Angular.
import { Routes, RouterModule } from '@angular/router'; // Importa las clases Routes y RouterModule para la configuración de rutas.

import { LoginPage } from './login.page'; // Importa el componente LoginPage, que es el principal para la página de login.

const routes: Routes = [ // Define el array de rutas para la página de login.
  {
    path: '', // Define la ruta raíz para la página de login.
    component: LoginPage // Asocia la ruta raíz con el componente LoginPage.
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Usa RouterModule.forChild() para registrar las rutas en este módulo.
  exports: [RouterModule], // Exporta RouterModule para que las rutas definidas en este módulo sean accesibles en otros módulos.
})
export class LoginPageRoutingModule {} // Define LoginPageRoutingModule que maneja las rutas relacionadas con la página de login.