// Importaciones necesarias para la configuración de rutas en Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActividadesPage } from './actividades.page'; // Importación del componente de la página de actividades

// Definición de las rutas para la página de actividades
const routes: Routes = [
  {
    path: '', // Ruta principal para esta página
    component: ActividadesPage // Componente asociado a esta ruta
  }
];

@NgModule({
  // Importa RouterModule y configura las rutas como un módulo hijo
  imports: [RouterModule.forChild(routes)], 
  exports: [RouterModule], // Exporta RouterModule para que otros módulos puedan usar las rutas
})
export class ActividadesPageRoutingModule {} // Exporta la configuración de rutas para la página de actividades