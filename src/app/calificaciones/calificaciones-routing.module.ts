import { NgModule } from '@angular/core';  // Importación del decorador NgModule de Angular
import { Routes, RouterModule } from '@angular/router';  // Importación de rutas y RouterModule para la configuración de la navegación

import { CalificacionesPage } from './calificaciones.page';  // Importación del componente CalificacionesPage

// Definición de las rutas para la página de calificaciones
const routes: Routes = [
  {
    path: '',  // Ruta raíz de la página de calificaciones
    component: CalificacionesPage  // Componente que se carga cuando la ruta es accedida
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configuración de las rutas usando RouterModule para este módulo específico
  exports: [RouterModule],  // Exportación de RouterModule para que pueda ser utilizado en otros módulos
})
export class CalificacionesPageRoutingModule {}  // Declaración del módulo de rutas de la página de calificaciones