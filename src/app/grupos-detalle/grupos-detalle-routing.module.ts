import { NgModule } from '@angular/core';  // Importa el decorador NgModule de Angular para definir módulos
import { Routes, RouterModule } from '@angular/router';  // Importa las funcionalidades de enrutamiento necesarias para gestionar las rutas

import { GruposDetallePage } from './grupos-detalle.page';  // Importa el componente GruposDetallePage, que será asociado a una ruta

// Define las rutas para esta página en particular
const routes: Routes = [
  {
    path: '',  // Ruta raíz para esta página, asociada al componente GruposDetallePage
    component: GruposDetallePage  // El componente que se mostrará cuando se acceda a esta ruta
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configura las rutas para este módulo específico usando RouterModule.forChild()
  exports: [RouterModule],  // Permite que RouterModule sea accesible en otros módulos que importen este módulo
})
export class GruposDetallePageRoutingModule {}  // Define el módulo de enrutamiento para la página de detalles de grupos